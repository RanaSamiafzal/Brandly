import { NextResponse } from 'next/server';
import { AuthService } from '@repo/core';

export async function GET(req, { params }) {
    try {
        const { id: campaignId } = await params;
        const token = req.cookies.get('token')?.value;
        if (!token) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

        const decoded = AuthService.validateToken(token);
        if (!decoded || decoded.role !== 'BRAND') return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

        const { RequestRepository } = await import('@repo/database/repositories/request-repository.js');
        const requests = await RequestRepository.getCampaignRequests(campaignId);

        const { CampaignRepository } = await import('@repo/database/repositories/campaign-repository.js');
        const campaign = await CampaignRepository.findById(campaignId);

        return NextResponse.json({ requests, campaign });
    } catch (error) {
        console.error('Fetch campaign requests error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
