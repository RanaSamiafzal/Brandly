import { ActivityRepository } from '@repo/database/repositories/activity-repository.js';

export const ActivityService = {
    async logActivity(data) {
        return ActivityRepository.create({
            userId: data.userId,
            role: data.role,
            type: data.type,
            title: data.title,
            description: data.description || "",
            relatedId: data.relatedId || null,
            isRead: false
        });
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
