import { InfluencerRepository } from '@repo/database/repositories/influencer-repository.js';
import { RequestRepository } from '@repo/database/repositories/request-repository.js';

/**
 * Influencer Service
 * Handles business logic for fetching and searching influencers.
 */
export const InfluencerService = {
    /**
     * Get all influencers with their user profiles.
     */
    async getAllInfluencers() {
        return InfluencerRepository.findAll();
    },

    /**
     * Search influencers based on filters (category, platform, query).
     * @param {Object} filters
     */
    async searchInfluencers(filters) {
        return InfluencerRepository.search(filters);
    },

    /**
     * Get a single influencer by ID with full details.
     * @param {string} id
     */
    async getInfluencerById(id) {
        const byProfileId = await InfluencerRepository.findById(id);
        if (byProfileId) return byProfileId;
        return InfluencerRepository.findByUserId(id);
    },

    /**
     * Get dashboard stats for an influencer
     * @param {string} userId
     */
    async getDashboardStats(userId) {
        const influencer = await InfluencerRepository.findByUserId(userId);
        if (!influencer) throw new Error("Influencer profile not found");

        const requests = await RequestRepository.getInfluencerRequests(userId);

        const activeCampaignsCount = requests.filter(r => r.status === 'ACCEPTED').length;
        const pendingRequestsCount = requests.filter(r => r.status === 'PENDING' && r.receiverId === userId).length;

        // Mock earnings for now or calculate if payment model is ready
        // In a real app, we would sum up payments
        const totalEarnings = 0;
        const completedCount = requests.filter(r => r.status === 'COMPLETED').length;

        return {
            stats: {
                activeCampaigns: activeCampaignsCount,
                totalEarnings: `$${totalEarnings}`,
                pendingRequests: pendingRequestsCount,
                completed: completedCount
            },
            influencer
        };
    },

    /**
     * Update influencer profile and sync with user table.
     */
    async updateInfluencerProfile(userId, profileData) {
        const influencer = await InfluencerRepository.findByUserId(userId);
        if (!influencer) throw new Error("Influencer profile not found");

        const { fullName, email, profilePic, coverPic, bio, platforms, ...rest } = profileData;

        // 1. Prepare User update data
        const userData = {};
        if (fullName) userData.fullname = fullName;
        if (email) userData.email = email;
        if (profilePic) userData.profilePic = profilePic;
        if (coverPic) userData.coverPic = coverPic;

        // 2. Prepare InfluencerProfile update data
        const influencerUpdateData = { ...rest };
        if (bio !== undefined) influencerUpdateData.about = bio;

        if (platforms) {
            try {
                influencerUpdateData.platforms = typeof platforms === 'string' ? JSON.parse(platforms) : platforms;
            } catch (e) {
                console.error("Failed to parse platforms:", e);
            }
        }

        // Use repository to handle the transaction and sync
        return InfluencerRepository.update(userId, influencerUpdateData, userData);
    }
};
