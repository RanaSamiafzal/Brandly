import { NextResponse } from 'next/server';
import { AuthService } from '@repo/core';

export async function POST(req) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        console.log('[DEBUG ROUTE] SMTP_USER:', process.env.SMTP_USER);
        console.log('[DEBUG ROUTE] SMTP_PASS:', process.env.SMTP_PASS ? '********' : 'MISSING');

        const result = await AuthService.requestOTP(email);
        return NextResponse.json(result);
    } catch (error) {
        console.error('Request OTP caught error:', error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
