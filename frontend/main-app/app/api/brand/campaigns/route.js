import { NextResponse } from 'next/server';
import { AuthService, BrandService, CampaignService, ActivityService } from '@repo/core';
import { prisma } from '@repo/database';

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
        console.error('Campaigns fetch error:', error);
        try { require('fs').writeFileSync('/tmp/brand_campaign_error.txt', error.stack || String(error)); } catch (e) {}
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const token = req.cookies.get('token')?.value;
        if (!token) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

        const decoded = AuthService.validateToken(token);
        if (!decoded || decoded.role !== 'BRAND') return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

        const profile = await BrandService.getBrandProfile(decoded.userId);
        const data = await req.json();

        const campaign = await CampaignService.createCampaign({
            ...data,
            brandId: profile.id,
            status: 'ACTIVE'
        });

        // Log activity
        ActivityService.logActivity({
            userId: decoded.userId,
            role: 'BRAND',
            type: 'CAMPAIGN_CREATED',
            title: 'Campaign Created',
            description: `Your campaign "${campaign.title}" has been created and is now active.`,
            relatedId: campaign.id
        }).catch(() => { });

        return NextResponse.json({ campaign });
    } catch (error) {
        console.error('Campaign creation error:', error);
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
    }
}
