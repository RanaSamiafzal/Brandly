import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import { UserRepository } from '@repo/database/repositories/user-repository.js';

const SECRET = process.env.AUTH_SECRET || 'dev_secret';

let _transporter = null;
const getTransporter = () => {
    if (_transporter) return _transporter;
    
    const host = process.env.SMTP_HOST;
    const port = parseInt(process.env.SMTP_PORT || '587');
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (host && user && pass) {
        _transporter = nodemailer.createTransport({
            host,
            port,
            secure: port === 465,
            auth: {
                user,
                pass,
            },
        });
    }
    return _transporter;
};

export const AuthService = {
    async register({ email, password, role, fullname }) {
        const existingUser = await UserRepository.findByEmail(email);
        if (existingUser) {
            throw new Error('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await UserRepository.create({
            email,
            fullname,
            password: hashedPassword,
            role: { connect: { name: role } }
        });

        // Create profile associated with user
        const upperRole = role.toUpperCase();
        if (upperRole === 'BRAND') {
            const { BrandRepository } = await import('@repo/database/repositories/brand-repository.js');
            await BrandRepository.updateProfile(user.id, { brandName: fullname });
        } else if (upperRole === 'INFLUENCER') {
            const { InfluencerRepository } = await import('@repo/database/repositories/influencer-repository.js');
            // Assuming default username from fullname/email for initial profile
            const username = fullname.toLowerCase().replace(/\s+/g, '_') + '_' + Math.random().toString(36).substring(2, 7);
            await InfluencerRepository.create({
                userId: user.id,
                username,
            });
        }

        const token = this.generateToken(user);
        return { user, token };
    },

    async login(email, password) {
        const user = await UserRepository.findByEmail(email);
        if (!user) {
            throw new Error('Invalid credentials');
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            throw new Error('Invalid credentials');
        }

        const token = this.generateToken(user);
        return { user, token };
    },

    async requestOTP(email) {
        const user = await UserRepository.findByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }

        // Generate random 6-digit OTP
        const otp = crypto.randomInt(100000, 999999).toString();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        // Save to DB
        await UserRepository.update(user.id, {
            resetOtp: otp,
            resetOtpExpires: expiresAt
        });

        console.log(`[AUTH] Generated OTP for ${email}: ${otp}`);
        
        console.log('[AUTH DEBUG] Runtime Config Check:');
        console.log('SMTP_HOST:', process.env.SMTP_HOST);
        console.log('SMTP_PORT:', process.env.SMTP_PORT);
        console.log('SMTP_USER:', process.env.SMTP_USER);
        console.log('SMTP_PASS:', process.env.SMTP_PASS ? '********' : 'MISSING');

        // Send via Nodemailer
        try {
            const transporter = getTransporter();
            if (!transporter) {
                console.warn('[AUTH DEBUG] SMTP credentials missing from process.env');
                return { message: 'OTP generated (Email skipped - No SMTP Config)' };
            }

            console.log(`[AUTH DEBUG] Attempting to send OTP email to ${email} via Nodemailer...`);
            
            await transporter.sendMail({
                from: `"Brandly" <${process.env.SMTP_USER}>`,
                to: email,
                subject: 'Your Brandly Password Reset Code',
                html: `
                    <div style="font-family: sans-serif; max-width: 400px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 16px;">
                        <h2 style="color: #0f172a; text-align: center;">Reset Your Password</h2>
                        <p style="color: #64748b; font-size: 14px; text-align: center;">Use the code below to complete your password reset request. This code will expire in 10 minutes.</p>
                        <div style="background: #f1f5f9; padding: 16px; border-radius: 12px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #3b82f6; margin: 24px 0;">
                            ${otp}
                        </div>
                        <p style="color: #94a3b8; font-size: 12px; text-align: center;">If you didn't request this, you can safely ignore this email.</p>
                    </div>
                `
            });

            console.log('[AUTH DEBUG] Nodemailer SUCCESS');
            return { message: 'OTP sent successfully' };
        } catch (error) {
            console.error('[NODEMAILER ERROR]', error);
            throw new Error('Failed to send email. Please check your SMTP configuration.');
        }
    },

    async verifyOTP(email, otp) {
        const user = await UserRepository.findByEmail(email);
        if (!user || !user.resetOtp) {
            throw new Error('Invalid request');
        }

        // Check expiration
        if (new Date() > user.resetOtpExpires) {
            throw new Error('OTP has expired');
        }

        // Check validity
        if (otp !== user.resetOtp) {
            throw new Error('Invalid OTP');
        }

        return { message: 'OTP verified' };
    },

    async resetPassword(email, newPassword) {
        const user = await UserRepository.findByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await UserRepository.update(user.id, {
            password: hashedPassword,
            resetOtp: null, // Clear OTP after success
            resetOtpExpires: null
        });

        return { message: 'Password reset successfully' };
    },

    generateToken(user) {
        return jwt.sign(
            { userId: user.id, role: user.role.name, email: user.email },
            SECRET,
            { expiresIn: '7d' }
        );
    },

    validateToken(token) {
        try {
            return jwt.verify(token, SECRET);
        } catch (error) {
            return null;
        }
    }
};
