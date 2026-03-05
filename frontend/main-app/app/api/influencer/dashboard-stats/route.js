import { NextResponse } from 'next/server';
import { AuthService, InfluencerService } from '@repo/core';

export async function GET(req) {
    try {
        const token = req.cookies.get('token')?.value;
        if (!token) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

        const decoded = AuthService.validateToken(token);
        // Roles are usually INFLUENCER or BRAND
        if (!decoded || decoded.role !== 'INFLUENCER') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        const dashboardData = await InfluencerService.getDashboardStats(decoded.userId);

        return NextResponse.json(dashboardData);
    } catch (error) {
        console.error('Influencer stats fetching error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
