import { prisma } from "../index.js";

export const CollaborationRepository = {
    // Tasks
    async getTasks(requestId) {
        return prisma.campaignTask.findMany({
            where: { requestId },
            orderBy: { createdAt: 'asc' }
        });
    },

    async createTask(data) {
        return prisma.campaignTask.create({
            data
        });
    },

    async updateTask(id, data) {
        return prisma.campaignTask.update({
            where: { id },
            data
        });
    },

    async deleteTask(id) {
        return prisma.campaignTask.delete({
            where: { id }
        });
    },

    // Messages
    async getMessages(requestId) {
        return prisma.message.findMany({
            where: { requestId },
            include: { sender: { select: { fullname: true, profilePic: true } } },
            orderBy: { createdAt: 'asc' }
        });
    },

    async saveMessage(data) {
        return prisma.message.create({
            data,
            include: { sender: { select: { fullname: true, profilePic: true } } }
        });
    }
};
