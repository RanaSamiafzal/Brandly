import { prisma } from "../index.js";

export const CampaignRepository = {
    async create(data) {
        return prisma.campaign.create({
            data,
            include: { brand: true }
        });
    },

    async findById(id) {
        return prisma.campaign.findUnique({
            where: { id },
            include: {
                brand: {
                    include: {
                        user: {
                            select: { profilePic: true, fullname: true, createdAt: true, isVerified: true }
                        }
                    }
                },
                requests: {
                    include: { sender: true, receiver: true }
                },
                matchScores: {
                    orderBy: { score: 'desc' },
                    take: 10,
                    include: { influencer: true }
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

    async update(id, data) {
        return prisma.campaign.update({
            where: { id },
            data,
        });
    },

    async softDelete(id) {
        return prisma.campaign.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    }
};
