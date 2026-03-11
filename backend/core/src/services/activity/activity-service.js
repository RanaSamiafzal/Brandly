import { ActivityRepository } from '@repo/database/repositories/activity-repository.js';

export const ActivityService = {
    async logActivity(data) {
        const activity = await ActivityRepository.create({
            userId: data.userId,
            role: data.role,
            type: data.type,
            title: data.title,
            description: data.description || "",
            relatedId: data.relatedId || null,
            isRead: false
        });

        // Emit real-time notification
        try {
            const { getIO } = await import('../../socket/socket-handler.js');
            const io = getIO();
            if (io) {
                io.to(`user_${data.userId}`).emit('new_activity', activity);
            }
        } catch (error) {
            console.error('Failed to emit activity via socket:', error);
        }

        return activity;
    },

    async getUserActivities(userId, limit = 20, filter = null) {
        return ActivityRepository.getUserActivities(userId, limit, filter);
    },

    async markAsRead(id) {
        return ActivityRepository.markAsRead(id);
    },

    async markAllAsRead(userId) {
        return ActivityRepository.markAllAsRead(userId);
    },

    async deleteActivity(id) {
        return ActivityRepository.deleteById(id);
    },

    async searchActivities(userId, query) {
        return ActivityRepository.search(userId, query);
    }
};
