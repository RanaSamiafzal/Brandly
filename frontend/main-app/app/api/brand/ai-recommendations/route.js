import { NextResponse } from 'next/server';
import { AuthService, BrandService } from '@repo/core';
import { prisma } from '@repo/database';

export async function GET(req) {
    try {
        const token = req.cookies.get('token')?.value;
        if (!token) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

        const decoded = AuthService.validateToken(token);
        if (!decoded || decoded.role !== 'BRAND') return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

        const profile = await BrandService.getBrandProfile(decoded.userId);

        // Fetch top AI match scores across ALL campaigns for this brand
        const topMatches = await prisma.matchScore.findMany({
            where: {
                campaign: {
                    brandId: profile.id
                }
            },
            orderBy: { score: 'desc' },
            take: 3, // For dashboard widget
            include: {
                influencer: { include: { user: true } },
                campaign: true
            }
        });

        // Removing duplicates (if same influencer matched multiple campaigns well)
        const uniqueInfluencers = [];
        const seenIds = new Set();

        for (const match of topMatches) {
            if (!seenIds.has(match.influencerId)) {
                seenIds.add(match.influencerId);
                uniqueInfluencers.push({
                    influencer: match.influencer,
                    score: match.score,
                    matchedCampaign: match.campaign.title
                });
            }
        }

        return NextResponse.json({ recommendations: uniqueInfluencers });
    } catch (error) {
        console.error('AI Recommendations fetch error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
