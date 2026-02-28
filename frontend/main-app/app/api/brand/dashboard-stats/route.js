import { NextResponse } from 'next/server';
import { AuthService, BrandService } from '@repo/core';

export async function GET(req) {
    try {
        const token = req.cookies.get('token')?.value;
        if (!token) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

        const decoded = AuthService.validateToken(token);
        if (!decoded || decoded.role !== 'BRAND') return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

        const profile = await BrandService.getBrandProfile(decoded.userId);
        if (!profile) return NextResponse.json({ error: 'Brand profile not found' }, { status: 404 });

        const stats = await BrandService.getDashboardStats(profile.id);

        return NextResponse.json({ stats });
    } catch (error) {
        console.error('Stats fetching error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
