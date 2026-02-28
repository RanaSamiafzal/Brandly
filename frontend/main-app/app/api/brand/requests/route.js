import { NextResponse } from 'next/server';
import { AuthService, RequestService, BrandService } from '@repo/core';

export async function GET(req) {
    try {
        const token = req.cookies.get('token')?.value;
        if (!token) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

        const decoded = AuthService.validateToken(token);
        if (!decoded || decoded.role !== 'BRAND') return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

        const profile = await BrandService.getBrandProfile(decoded.userId);
        const requests = await RequestService.getBrandRequests(profile.id);

        return NextResponse.json({ requests });
    } catch (error) {
        console.error('Requests retrieval error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
