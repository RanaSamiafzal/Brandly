import { NextResponse } from 'next/server';
import { prisma } from '@repo/database';

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const category = searchParams.get('category');
        const minFollowers = searchParams.get('minFollowers');

        let where = {};
        if (category && category !== 'All Categories') {
            where.category = { equals: category, mode: 'insensitive' };
        }

        const influencers = await prisma.influencerProfile.findMany({
            where,
            include: { user: { select: { fullname: true, profilePic: true } } },
            take: 20
        });

        // Optional post-filtering for nested JSON if requested
        let results = influencers;
        if (minFollowers) {
            const minNum = parseInt(minFollowers);
            results = influencers.filter(inf => {
                if (!inf.platforms || !Array.isArray(inf.platforms)) return false;
                // Check if any platform meets the follower requirement
                return inf.platforms.some(p => p.followers >= minNum);
            });
        }

        return NextResponse.json({ influencers: results });
    } catch (error) {
        console.error('Search evaluation error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
