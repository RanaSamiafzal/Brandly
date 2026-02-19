import { prisma } from "../index";

export const MatchRepository = {
    async saveMatches(matches) {
        // matches is an array of { campaignId, influencerId, score, breakdown }
        return prisma.$transaction(
            matches.map((match) =>
                prisma.matchScore.create({
                    data: match,
                })
            )
        );
    },

    async findByCampaignId(campaignId) {
        return prisma.matchScore.findMany({
            where: { campaignId },
            include: { influencer: true },
            orderBy: { score: 'desc' },
        });
    },
};
