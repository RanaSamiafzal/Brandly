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
        return prisma.influencerProfile.findMany({
            include: { user: true }
        });
    },

    async search(filters) {
        const where = {};
        if (filters.category && filters.category !== "All Categories") {
            where.category = {
                contains: filters.category,
                mode: 'insensitive'
            };
        }

        // Basic search by name or username if provided
        if (filters.query) {
            where.OR = [
                { user: { fullname: { contains: filters.query, mode: 'insensitive' } } },
                { username: { contains: filters.query, mode: 'insensitive' } }
            ];
        }

        return prisma.influencerProfile.findMany({
            where,
            include: { user: true }
        });
    },

    async update(id, data) {
        return prisma.influencerProfile.update({
            where: { id },
            data,
        });
    },
};
