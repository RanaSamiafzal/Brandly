import { NextResponse } from 'next/server';
import { AuthService, RequestService, BrandService } from '@repo/core';

export async function POST(req) {
    // ... existing POST logic ...
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
            receiverId: brandProfile.userId,
            proposedBudget: proposedBudget || campaign.budgetMin,
            note: note || `I'm interested in collaborating on "${campaign.title}"!`,
        });

        return NextResponse.json({ success: true, request });
    } catch (error) {
        console.error('Influencer application error:', error);
        if (error.message && error.message.includes("already sent")) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function GET(req) {
    try {
        const token = req.cookies.get('token')?.value;
        if (!token) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

        const decoded = AuthService.validateToken(token);
        if (!decoded || decoded.role !== 'INFLUENCER') return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

        const requests = await RequestService.getInfluencerRequests(decoded.userId);

        const formatted = requests.map(req => ({
            id: req.id,
            status: req.status.toLowerCase(),
            campaignId: req.campaign.id,
            campaignTitle: req.campaign.title,
            description: req.campaign.description,
            budget: req.proposedBudget ? `$${req.proposedBudget}` : `$${req.campaign.budgetMin}-$${req.campaign.budgetMax}`,
            receivedDate: new Date(req.createdAt).toLocaleDateString(),
            brandName: req.campaign.brand.brandName || "Brand",
            brandLogo: req.campaign.brand.logo || `https://ui-avatars.com/api/?name=${req.campaign.brand.brandName || 'B'}&background=random`,
            brandId: req.campaign.brand.id, // Direct ID from campaign.brand
            resources: req.campaign.resources || [],
            note: req.note
        }));

        return NextResponse.json({ requests: formatted });
    } catch (error) {
        console.error('Fetch influencer requests error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
