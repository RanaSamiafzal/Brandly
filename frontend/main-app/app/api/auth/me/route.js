import { NextResponse } from 'next/server';
import { AuthService } from '@repo/core';

export async function GET(req) {
    try {
        const token = req.cookies.get('token')?.value;

        if (!token) {
            return NextResponse.json(
                { error: 'Not authenticated' },
                { status: 401 }
            );
        }

        const decoded = AuthService.validateToken(token);
        if (!decoded) {
            return NextResponse.json(
                { error: 'Invalid token' },
                { status: 401 }
            );
        }

        // Ideally, we'd fetch the latest user info from DB here
        // For efficiency, we can return the decoded data if it's enough
        return NextResponse.json({
            user: {
                id: decoded.userId,
                email: decoded.email,
                role: decoded.role,
            }
        });
    } catch (error) {
        console.error('Session error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
