import { prisma } from "../index.js";

export const MatchRepository = {
    async saveMatches(matches) {
        if (!matches || matches.length === 0) return;

        const campaignId = matches[0].campaignId;

        // matches is an array of { campaignId, influencerId, score, breakdown }
        return prisma.$transaction([
            // 1. Clear existing matches for this campaign
            prisma.matchScore.deleteMany({
                where: { campaignId }
            }),
            // 2. Insert new matches
            ...matches.map((match) =>
                prisma.matchScore.create({
                    data: match,
                })
            )
        ]);
    },

    async findByCampaignId(campaignId) {
        return prisma.matchScore.findMany({
            where: { campaignId },
            include: {
                influencer: {
                    include: { user: true }
                }
            },
            orderBy: { score: 'desc' },
        });
    },
};
