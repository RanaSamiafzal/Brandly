import { prisma } from "../index";

export const CampaignRepository = {
    async create(data) {
        return prisma.campaign.create({
            data,
        });
    },

    async findById(id) {
        return prisma.campaign.findUnique({
            where: { id },
            include: {
                brand: true,
                invites: true,
                matchScores: {
                    orderBy: { score: 'desc' },
                    take: 10, // Top 10 by default
                },
            },
        });
    },

    async findByBrandId(brandId) {
        return prisma.campaign.findMany({
            where: {
                brandId,
                deletedAt: null
            },
            orderBy: { createdAt: 'desc' },
        });
    },

    async updateStatus(id, status) {
        return prisma.campaign.update({
            where: { id },
            data: { status },
        });
    },

    async softDelete(id) {
        return prisma.campaign.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    }
};
