import { CollaborationRepository } from '@repo/database/repositories/collaboration-repository.js';
import { RequestRepository } from '@repo/database/repositories/request-repository.js';

export const CollaborationService = {
    // Task Logic
    async getCollabTasks(requestId) {
        return CollaborationRepository.getTasks(requestId);
    },

    async addCollabTask(data) {
        const task = await CollaborationRepository.createTask(data);

        // Notify the other party
        const request = await RequestRepository.findById(data.requestId);
        if (request) {
            const { ActivityService } = await import('../activity/activity-service.js');
            // Usually brand adds tasks, notify influencer
            const targetId = request.receiverId; // Assuming receiver is influencer
            await ActivityService.logActivity({
                userId: targetId,
                role: "INFLUENCER",
                type: "TASK_CREATED",
                title: "New Task Assigned",
                description: `A new task "${task.title}" has been added to your collaboration.`,
                relatedId: task.id
            });
        }

        return task;
    },

    async updateCollabTask(id, data) {
        const task = await CollaborationRepository.updateTask(id, data);

        // Notify updated party (simplified)
        const request = await RequestRepository.findById(task.requestId);
        if (request) {
            const { ActivityService } = await import('../activity/activity-service.js');
            const targetId = request.receiverId;
            await ActivityService.logActivity({
                userId: targetId,
                role: "INFLUENCER",
                type: "TASK_UPDATED",
                title: "Task Updated",
                description: `The task "${task.title}" has been updated.`,
                relatedId: task.id
            });
        }

        return task;
    },

    async deleteCollabTask(id) {
        return CollaborationRepository.deleteTask(id);
    },

    // Chat Logic
    async getCollabMessages(requestId) {
        return CollaborationRepository.getMessages(requestId);
    },

    async processNewMessage(data) {
        const message = await CollaborationRepository.saveMessage({
            requestId: data.requestId,
            senderId: data.senderId,
            content: data.content
        });

        // Notify the recipient
        const request = await RequestRepository.findById(data.requestId);
        if (request) {
            const { ActivityService } = await import('../activity/activity-service.js');
            const recipientId = message.senderId === request.senderId ? request.receiverId : request.senderId;
            const recipientRole = message.senderId === request.senderId ? "INFLUENCER" : "BRAND";

            await ActivityService.logActivity({
                userId: recipientId,
                role: recipientRole,
                type: "NEW_MESSAGE",
                title: "New Message",
                description: `${message.sender.fullname} sent you a message: "${message.content.substring(0, 50)}${message.content.length > 50 ? '...' : ''}"`,
                relatedId: request.id
            });
        }

        return message;
    }
};
