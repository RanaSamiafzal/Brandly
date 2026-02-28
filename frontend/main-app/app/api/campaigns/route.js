import { NextResponse } from 'next/server';
import { AuthService, CampaignService, BrandService } from '@repo/core';

export async function POST(req) {
    try {
        const token = req.cookies.get('token')?.value;
        if (!token) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

        const decoded = AuthService.validateToken(token);
        if (!decoded || decoded.role !== 'BRAND') return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

        const profile = await BrandService.getBrandProfile(decoded.userId);
        const data = await req.json();

        // Pass brand ID along with request body to service
        const campaign = await CampaignService.createCampaign({ ...data, brandId: profile.id });

        // Optionally, run AI Matching immediately, depending on setup
        // await CampaignService.matchInfluencers(campaign.id);

        return NextResponse.json({ campaign }, { status: 201 });
    } catch (error) {
        console.error('Campaign creation error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function GET(req) {
    try {
        const token = req.cookies.get('token')?.value;
        if (!token) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

        const decoded = AuthService.validateToken(token);
        if (!decoded || decoded.role !== 'BRAND') return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

        const profile = await BrandService.getBrandProfile(decoded.userId);
        const campaigns = await CampaignService.getBrandCampaigns(profile.id);

        return NextResponse.json({ campaigns });
    } catch (error) {
        console.error('Campaign retrieval error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
