import { NextResponse } from 'next/server';
import { AuthService, RequestService, InfluencerService, BrandService } from '@repo/core';

export async function GET(req) {
    try {
        const token = req.cookies.get('token')?.value;
        if (!token) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

        const decoded = AuthService.validateToken(token);
        if (!decoded || decoded.role !== 'BRAND') return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

        const profile = await BrandService.getBrandProfile(decoded.userId);
        const requests = await RequestService.getBrandRequests(profile.id);

        return NextResponse.json({ requests });
    } catch (error) {
        console.error('Requests retrieval error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const token = req.cookies.get('token')?.value;
        if (!token) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

        const decoded = AuthService.validateToken(token);
        if (!decoded || decoded.role !== 'BRAND') return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

        const body = await req.json();
        const { campaignId, influencerId, proposedBudget, note } = body;

        if (!campaignId || !influencerId) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Search for influencer profile to get their userId
        const influencer = await InfluencerService.getInfluencerById(influencerId);
        if (!influencer) {
            return NextResponse.json({ error: 'Influencer not found' }, { status: 404 });
        }

        const request = await RequestService.sendRequest({
            campaignId,
            senderId: decoded.userId,
            receiverId: influencer.userId, // Send to influencer's userId
            proposedBudget: proposedBudget || 0,
            note: note || "Hi! We'd love to collaborate with you on our upcoming campaign.",
        });

        return NextResponse.json({ success: true, request });
    } catch (error) {
        console.error('Invite error:', error);

        // Return a clean error message for duplicate requests
        if (error.message && error.message.includes("already sent")) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json({ error: 'Failed to send invitation. Please try again.' }, { status: 500 });
    }
}
