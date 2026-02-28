import { ActivityRepository } from '@repo/database/repositories/activity-repository.js';

export const ActivityService = {
    /**
     * Log a new activity for a user.
     */
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

    /**
     * Retrieve a user's latest notifications/activities.
     */
    async getUserActivities(userId, limit = 10) {
        return ActivityRepository.getUserActivities(userId, limit);
    },

    /**
     * Mark a single activity as read.
     */
    async markAsRead(id) {
        return ActivityRepository.markAsRead(id);
    },

    /**
     * Mark all activities for a user as read.
     */
    async markAllAsRead(userId) {
        return ActivityRepository.markAllAsRead(userId);
    }
};
