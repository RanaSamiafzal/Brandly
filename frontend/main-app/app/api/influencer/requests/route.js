import { NextResponse } from 'next/server';
import { AuthService, RequestService, BrandService } from '@repo/core';

export async function POST(req) {
    try {
        const token = req.cookies.get('token')?.value;
        if (!token) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

        const decoded = AuthService.validateToken(token);
        if (!decoded || decoded.role !== 'INFLUENCER') return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

        const body = await req.json();
        const { campaignId, proposedBudget, note } = body;

        if (!campaignId) {
            return NextResponse.json({ error: 'Campaign ID is required' }, { status: 400 });
        }

        // Fetch brand using the campaign's brandId
        // First we need to get campaign details
        const { CampaignRepository } = await import('@repo/database/repositories/campaign-repository.js');
        const campaign = await CampaignRepository.findById(campaignId);
        if (!campaign) {
            return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
        }

        const brandProfile = await BrandService.getBrandProfile(campaign.brand.userId);
        if (!brandProfile) {
            return NextResponse.json({ error: 'Brand not found' }, { status: 404 });
        }

        const request = await RequestService.sendRequest({
            campaignId,
            senderId: decoded.userId,
            receiverId: brandProfile.userId, // Send to brand's userId
            proposedBudget: proposedBudget || campaign.budgetMin,
            note: note || `I'm interested in collaborating on "${campaign.title}"!`,
        });

        return NextResponse.json({ success: true, request });
    } catch (error) {
        console.error('Influencer application error:', error);

        // Handle duplicate requests (P2002)
        if (error.message && error.message.includes("already sent")) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
