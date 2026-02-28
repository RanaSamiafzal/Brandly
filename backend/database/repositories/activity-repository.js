import { prisma } from "../index.js";

export const ActivityRepository = {
    async create(data) {
        return prisma.activity.create({ data });
    },

    async findById(id) {
        return prisma.activity.findUnique({ where: { id } });
    },

    async getUserActivities(userId, limit = 20, filter = null) {
        const where = { userId };
        if (filter === 'unread') where.isRead = false;
        if (filter === 'read') where.isRead = true;
        return prisma.activity.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            take: limit
        });
    },

    async search(userId, query) {
        return prisma.activity.findMany({
            where: {
                userId,
                OR: [
                    { title: { contains: query, mode: 'insensitive' } },
                    { description: { contains: query, mode: 'insensitive' } },
                ]
            },
            orderBy: { createdAt: 'desc' }
        });
    },

    async markAsRead(id) {
        return prisma.activity.update({ where: { id }, data: { isRead: true } });
    },

    async markAllAsRead(userId) {
        return prisma.activity.updateMany({
            where: { userId, isRead: false },
            data: { isRead: true }
        });
    },

    async deleteById(id) {
        return prisma.activity.delete({ where: { id } });
    }
};
