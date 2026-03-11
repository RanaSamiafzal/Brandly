import { NextResponse } from 'next/server';
import { AuthService, InfluencerService } from '@repo/core';

export async function GET(req) {
    try {
        const token = req.cookies.get('token')?.value;
        if (!token) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

        const decoded = AuthService.validateToken(token);
        if (!decoded || decoded.role !== 'INFLUENCER') return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

        const { influencer } = await InfluencerService.getDashboardStats(decoded.userId);
        return NextResponse.json({ profile: influencer });
    } catch (error) {
        console.error('Fetch profile error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function PATCH(req) {
    try {
        const token = req.cookies.get('token')?.value;
        if (!token) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

        const decoded = AuthService.validateToken(token);
        if (!decoded || decoded.role !== 'INFLUENCER') return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

        const data = await req.json();

        const updatedProfile = await InfluencerService.updateInfluencerProfile(decoded.userId, data);

        return NextResponse.json({ success: true, profile: updatedProfile });
    } catch (error) {
        console.error('Update profile error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
