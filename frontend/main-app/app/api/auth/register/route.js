import { NextResponse } from 'next/server';
import { AuthService } from '@repo/core';

export async function POST(req) {
    try {
        const { email, password, role, fullname } = await req.json();

        if (!email || !password || !role || !fullname) {
            return NextResponse.json(
                { error: 'Email, password, role, and fullname are required' },
                { status: 400 }
            );
        }

        const validRoles = ['BRAND', 'INFLUENCER'];
        if (!validRoles.includes(role.toUpperCase())) {
            return NextResponse.json(
                { error: 'Invalid role' },
                { status: 400 }
            );
        }

        const result = await AuthService.register({ email, password, role: role.toUpperCase(), fullname });

        const response = NextResponse.json({
            user: {
                id: result.user.id,
                email: result.user.email,
                fullname: result.user.fullname,
                role: result.user.role.name,
            },
            message: 'Registration successful'
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
        console.error('Registration error:', error);
        return NextResponse.json(
            { error: error.message || 'Registration failed' },
            { status: 500 }
        );
    }
}
