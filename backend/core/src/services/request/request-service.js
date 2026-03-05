import { RequestRepository } from '@repo/database/repositories/request-repository.js';
import { ActivityService } from '../activity/activity-service.js';
import { CampaignRepository } from '@repo/database/repositories/campaign-repository.js';

export const RequestService = {
    /**
     * Create a collaboration request and log the activity.
     */
    async sendRequest(data) {
        try {
            const request = await RequestRepository.create({
                campaignId: data.campaignId,
                senderId: data.senderId,
                receiverId: data.receiverId,
                proposedBudget: data.proposedBudget,
                note: data.note,
                status: "PENDING"
            });

            // Fetch campaign to get title for notification
            const campaign = await CampaignRepository.findById(data.campaignId);

            // Notify Receiver
            await ActivityService.logActivity({
                userId: data.receiverId,
                role: "INFLUENCER",
                type: "REQUEST_RECEIVED",
                title: "New Collaboration Request",
                description: `You have received a new collaboration request for campaign: ${campaign?.title}`,
                relatedId: request.id
            });

            return request;
        } catch (error) {
            // Prisma code P2002 is for unique constraint failed
            if (error.code === 'P2002') {
                throw new Error("Invitation already sent to this influencer for this campaign");
            }
            throw error;
        }
    },

    /**
     * Respond to a request (ACCEPT/REJECT/CANCEL).
     */
    async respondToRequest(requestId, status, responderId) {
        const request = await RequestRepository.findById(requestId);
        if (!request) throw new Error("Request not found");
        if (request.receiverId !== responderId && request.senderId !== responderId) {
            throw new Error("Unauthorized to respond to this request");
        }

        const updatedRequest = await RequestRepository.updateStatus(requestId, status);

        // If accepted, update the campaign status as well
        if (status === 'ACCEPTED') {
            await CampaignRepository.updateStatus(request.campaignId, 'IN_PROGRESS');
        }

        // Notify the original sender about the decision
        const notifyTargetId = (responderId === request.receiverId) ? request.senderId : request.receiverId;

        await ActivityService.logActivity({
            userId: notifyTargetId,
            role: "BRAND", // Or dynamic based on sender
            type: `REQUEST_${status}`,
            title: `Collaboration Request ${status}`,
            description: `A collaboration request for ${request.campaign.title} was ${status.toLowerCase()}.`,
            relatedId: requestId
        });

        return updatedRequest;
    },

    /**
     * Get all requests involving a specific brand's campaigns.
     */
    async getBrandRequests(brandId) {
        return RequestRepository.getBrandRequests(brandId);
    },

    /**
     * Get all requests involving a specific influencer.
     */
    async getInfluencerRequests(userId) {
        return RequestRepository.getInfluencerRequests(userId);
    }
};
