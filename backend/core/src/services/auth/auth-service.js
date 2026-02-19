import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserRepository } from '@repo/database/repositories/user-repository';

const SECRET = process.env.AUTH_SECRET || 'dev_secret';

export const AuthService = {
    async register(email, password, role) {
        const existingUser = await UserRepository.findByEmail(email);
        if (existingUser) {
            throw new Error('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Create logic would need to handle Role creation/linking properly
        // For simplicity, assuming Role exists or is handled by seed
        const user = await UserRepository.create({
            email,
            password: hashedPassword,
            role: { connect: { name: role } }
        });

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
