import { prisma } from "../index.js";

export const ActivityRepository = {
    async create(data) {
        return prisma.activity.create({
            data
        });
    },

    async getUserActivities(userId, limit = 10) {
        return prisma.activity.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            take: limit
        });
    },

    async markAsRead(id) {
        return prisma.activity.update({
            where: { id },
            data: { isRead: true }
        });
    },

    async markAllAsRead(userId) {
        return prisma.activity.updateMany({
            where: { userId, isRead: false },
            data: { isRead: true }
        });
    }
};
