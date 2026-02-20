import { NextResponse } from 'next/server';
import { AuthService } from '@repo/core';

export async function POST(req) {
    try {
        const { email, otp } = await req.json();

        if (!email || !otp) {
            return NextResponse.json({ error: 'Email and OTP are required' }, { status: 400 });
        }

        const result = await AuthService.verifyOTP(email, otp);
        return NextResponse.json(result);
    } catch (error) {
        console.error('Verify OTP error:', error);
        return NextResponse.json({ error: error.message }, { status: 401 });
    }
}
