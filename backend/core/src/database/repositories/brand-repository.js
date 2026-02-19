import { prisma } from "../index";

export const BrandRepository = {
    async create(data) {
        return prisma.brandProfile.create({
            data,
        });
    },

    async findByUserId(userId) {
        return prisma.brandProfile.findUnique({
            where: { userId },
        });
    },

    async update(id, data) {
        return prisma.brandProfile.update({
            where: { id },
            data,
        });
    },
};
