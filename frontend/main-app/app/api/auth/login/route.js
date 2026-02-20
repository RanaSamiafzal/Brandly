import { NextResponse } from 'next/server';
import { AuthService } from '@repo/core';

export async function POST(req) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email and password are required' },
                { status: 400 }
            );
        }

        const result = await AuthService.login(email, password);

        const response = NextResponse.json({
            user: {
                id: result.user.id,
                email: result.user.email,
                role: result.user.role.name,
            },
            message: 'Login successful'
        });

        // Set JWT in a cookie
        response.cookies.set('token', result.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/',
        });

        return response;
    } catch (error) {
        console.error('Login error:', error);

        // Determine user-friendly error message
        let errorMessage = 'An unexpected error occurred. Please try again later.';
        let status = 500;

        if (error.message === 'Invalid credentials' || error.message === 'User not found') {
            errorMessage = 'Invalid email or password.';
            status = 401;
        }

        return NextResponse.json(
            { error: errorMessage },
            { status }
        );
    }
}
