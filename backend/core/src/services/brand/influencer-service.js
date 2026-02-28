import { InfluencerRepository } from '@repo/database/repositories/influencer-repository.js';

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
        return InfluencerRepository.findByUserId(id);
    }
};
