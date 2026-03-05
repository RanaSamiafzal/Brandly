import { NextResponse } from 'next/server';
import { AuthService, CampaignService } from '@repo/core';

export async function GET(req, { params }) {
    try {
        const { id: brandId } = await params;
        const token = req.cookies.get('token')?.value;
        if (!token) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

        const decoded = AuthService.validateToken(token);
        if (!decoded || decoded.role !== 'INFLUENCER') return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

        // Retrieve all campaigns for this brand and filter for ACTIVE ones
        const allCampaigns = await CampaignService.getBrandCampaigns(brandId);
        const activeCampaigns = allCampaigns.filter(c => c.status === 'ACTIVE' && !c.deletedAt);

        return NextResponse.json({ campaigns: activeCampaigns });
    } catch (error) {
        console.error('Fetch brand campaigns error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
