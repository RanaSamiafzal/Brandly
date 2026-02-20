import { NextResponse } from 'next/server';
import { AuthService } from '@repo/core';

export async function POST(req) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        const result = await AuthService.requestOTP(email);
        return NextResponse.json(result);
    } catch (error) {
        console.error('Request OTP error:', error);
        return NextResponse.json({ error: error.message }, { status: 404 });
    }
}
