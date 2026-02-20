import { prisma } from "../index.js";

export const UserRepository = {
    async findById(id) {
        return prisma.user.findUnique({
            where: { id },
            include: {
                role: true,
                brandProfile: true,
                influencerProfile: true,
            },
        });
    },

    async findByEmail(email) {
        return prisma.user.findUnique({
            where: { email },
            include: { role: true },
        });
    },

    async create(data) {
        // data should include { email, password, roleId }
        return prisma.user.create({
            data,
            include: { role: true },
        });
    },

    async update(id, data) {
        return prisma.user.update({
            where: { id },
            data,
        });
    },

    async softDelete(id) {
        return prisma.user.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    },
};
