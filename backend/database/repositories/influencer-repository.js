import { prisma } from "../index.js";

export const InfluencerRepository = {
    async create(data) {
        return prisma.influencerProfile.create({
            data,
        });
    },

    async findByUserId(userId) {
        return prisma.influencerProfile.findUnique({
            where: { userId },
            include: { user: true }
        });
    },

    async findById(id) {
        return prisma.influencerProfile.findUnique({
            where: { id },
            include: { user: true }
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

    async update(userId, data, userData = {}) {
        // Use transaction to update both InfluencerProfile and User
        return prisma.$transaction(async (tx) => {
            const profile = await tx.influencerProfile.update({
                where: { userId },
                data,
            });

            // Sync with User table if userData is provided
            // Also check if legacy fields (profilePic, coverPic) are in 'data' for backward compatibility
            const userUpdateData = { ...userData };
            if (data.profilePic && !userUpdateData.profilePic) userUpdateData.profilePic = data.profilePic;
            if (data.coverPic && !userUpdateData.coverPic) userUpdateData.coverPic = data.coverPic;

            if (Object.keys(userUpdateData).length > 0) {
                await tx.user.update({
                    where: { id: userId },
                    data: userUpdateData
                });
            }

            return tx.influencerProfile.findUnique({
                where: { userId },
                include: { user: true }
            });
        });
    },
};
