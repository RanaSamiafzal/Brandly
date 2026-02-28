import { prisma } from "../index.js";

export const RequestRepository = {
    async create(data) {
        return prisma.collaborationRequest.create({
            data
        });
    },

    async findById(id) {
        return prisma.collaborationRequest.findUnique({
            where: { id },
            include: { sender: true, receiver: true, campaign: true }
        });
    },

    async getBrandRequests(brandId) {
        return prisma.collaborationRequest.findMany({
            where: {
                campaign: { brandId }
            },
            include: {
                sender: { include: { influencerProfile: true, brandProfile: true } },
                receiver: { include: { influencerProfile: true, brandProfile: true } },
                campaign: true
            },
            orderBy: { createdAt: 'desc' }
        });
    },

    async getInfluencerRequests(influencerUserId) {
        return prisma.collaborationRequest.findMany({
            where: {
                OR: [
                    { receiverId: influencerUserId },
                    { senderId: influencerUserId }
                ]
            },
            include: { campaign: true, sender: true, receiver: true },
            orderBy: { createdAt: 'desc' }
        });
    },

    async updateStatus(id, status) {
        return prisma.collaborationRequest.update({
            where: { id },
            data: {
                status,
                respondedAt: new Date()
            }
        });
    }
};
