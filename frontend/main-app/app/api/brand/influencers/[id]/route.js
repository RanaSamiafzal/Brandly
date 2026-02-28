import { NextResponse } from 'next/server';
import { AuthService, InfluencerService } from '@repo/core';

/**
 * GET /api/brand/influencers/[id]
 * Fetch detailed influencer profile.
 */
export async function GET(req, { params }) {
    try {
        const token = req.cookies.get('token')?.value;
        if (!token) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

        const decoded = AuthService.validateToken(token);
        if (!decoded || decoded.role !== 'BRAND') return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

        const { id } = await params;

        // Note: InfluencerService.getInfluencerById uses findByUserId inside
        // but we might want to check both or just consistently use profile ID
        const influencer = await InfluencerService.getInfluencerById(id);

        if (!influencer) {
            return NextResponse.json({ error: 'Influencer not found' }, { status: 404 });
        }

        return NextResponse.json({ influencer });
    } catch (error) {
        console.error('Fetch influencer error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
