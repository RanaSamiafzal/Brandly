import { NextResponse } from 'next/server';
import { AuthService, CampaignService, BrandService } from '@repo/core';

export async function GET(req, { params }) {
    try {
        const token = req.cookies.get('token')?.value;
        if (!token) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

        const decoded = AuthService.validateToken(token);
        if (!decoded || decoded.role !== 'BRAND') return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

        const { id: campaignId } = params;

        // This triggers the AI engine and stores matches
        await CampaignService.matchInfluencers(campaignId);

        // Fetch the matches with influencer profiles included
        const matches = await CampaignService.getCampaignWithMatches(campaignId);

        return NextResponse.json({
            matches: matches.matches,
            campaign: { title: matches.title },
            status: matches.status
        });
    } catch (error) {
        console.error('AI Matching error:', error);
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
    }
}
