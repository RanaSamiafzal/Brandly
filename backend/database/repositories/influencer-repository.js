import { prisma } from "../index";

export const InfluencerRepository = {
    async create(data) {
        return prisma.influencerProfile.create({
            data,
        });
    },

    async findByUserId(userId) {
        return prisma.influencerProfile.findUnique({
            where: { userId },
        });
    },

    async findAll() {
        return prisma.influencerProfile.findMany();
    },

    async update(id, data) {
        return prisma.influencerProfile.update({
            where: { id },
            data,
        });
    },
};
