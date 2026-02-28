import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Resend } from 'resend';
import crypto from 'crypto';
import { UserRepository } from '@repo/database/repositories/user-repository.js';

const SECRET = process.env.AUTH_SECRET || 'dev_secret';
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

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

        // Send via Resend
        try {
            if (!resend) {
                console.warn('[AUTH] Resend API key missing. Email not sent, but proceeding for development.');
                return { message: 'OTP generated (Email skipped - No API Key)' };
            }
            await resend.emails.send({
                from: 'Brandly <onboarding@resend.dev>', // Resend default for unverified domains
                to: email,
                subject: 'Your Brandly Password Reset Code',
                html: `
                    <div style="font-family: sans-serif; max-width: 400px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded: 16px;">
                        <h2 style="color: #0f172a; text-align: center;">Reset Your Password</h2>
                        <p style="color: #64748b; font-size: 14px; text-align: center;">Use the code below to complete your password reset request. This code will expire in 10 minutes.</p>
                        <div style="background: #f1f5f9; padding: 16px; border-radius: 12px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #3b82f6; margin: 24px 0;">
                            ${otp}
                        </div>
                        <p style="color: #94a3b8; font-size: 12px; text-align: center;">If you didn't request this, you can safely ignore this email.</p>
                    </div>
                `
            });
            return { message: 'OTP sent successfully' };
        } catch (error) {
            console.error('[RESEND ERROR]', error);
            throw new Error('Failed to send email. Please try again later.');
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
