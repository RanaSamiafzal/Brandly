import { NextResponse } from 'next/server';
import { AuthService, InfluencerService } from '@repo/core';

export async function GET(req) {
    try {
        const token = req.cookies.get('token')?.value;
        if (!token) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

        const decoded = AuthService.validateToken(token);
        if (!decoded || decoded.role !== 'BRAND') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        const { searchParams } = new URL(req.url);
        const category = searchParams.get('category');
        const platform = searchParams.get('platform');
        const query = searchParams.get('query');

        const influencers = await InfluencerService.searchInfluencers({
            category,
            platform,
            query
        });

        return NextResponse.json({ influencers });
    } catch (error) {
        console.error('Influencer search error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
