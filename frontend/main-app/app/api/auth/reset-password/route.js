import { NextResponse } from 'next/server';
import { AuthService } from '@repo/core';

export async function POST(req) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: 'Email and new password are required' }, { status: 400 });
        }

        const result = await AuthService.resetPassword(email, password);
        return NextResponse.json(result);
    } catch (error) {
        console.error('Reset password error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
