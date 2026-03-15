import { NextResponse } from 'next/server';
import { AuthService, CampaignService } from '@repo/core';

export async function GET(req, { params }) {
    try {
        const { id: campaignId } = await params;
        const token = req.cookies.get('token')?.value;
        if (!token) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

        const decoded = AuthService.validateToken(token);
        if (!decoded || decoded.role !== 'INFLUENCER') return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

        const { CampaignRepository } = await import('@repo/database/repositories/campaign-repository.js');
        const campaign = await CampaignRepository.findById(campaignId);

        if (!campaign || campaign.deletedAt) {
            return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
        }

        // Check for specific request status
        const myRequest = requests.find(r => r.campaignId === campaignId);
        const hasApplied = !!myRequest;
        const acceptedRequestId = (myRequest?.status === 'ACCEPTED') ? myRequest.id : null;

        return NextResponse.json({ 
            campaign,
            hasApplied,
            acceptedRequestId
        });
    } catch (error) {
        console.error('Fetch campaign detail error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
