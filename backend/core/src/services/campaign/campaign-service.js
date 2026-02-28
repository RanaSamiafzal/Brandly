import { CampaignRepository } from '@repo/database/repositories/campaign-repository.js';
import { InfluencerRepository } from '@repo/database/repositories/influencer-repository.js';
import { MatchRepository } from '@repo/database/repositories/match-repository.js';
import { rankInfluencers } from '@repo/ai-engine/ranker';

/**
 * Campaign Service
 * Orchestrates campaign creation, AI matching, and result storage.
 */
export const CampaignService = {
    /**
     * Create a new campaign for a brand.
     * @param {Object} data - Campaign details including targets and requirements
     * @returns {Promise<Object>} The created campaign.
     */
    async createCampaign(data) {
        const campaign = await CampaignRepository.create({
            brandId: data.brandId,
            title: data.title,
            description: data.description || "",
            budgetMin: data.budgetMin || 0,
            budgetMax: data.budgetMax || 0,
            targetCategory: data.targetCategory || [],
            targetPlatform: data.targetPlatform || [],
            campaignTimeline: data.campaignTimeline || "",
            deliverables: data.deliverables || "",
            targetAudience: data.targetAudience || "",
            additionalRequirements: data.additionalRequirements || "",
            status: data.status || 'DRAFT',
        });
        return campaign;
    },

    /**
     * Run AI matching for a campaign.
     * Fetches all influencers, runs the engine, stores results, returns top 10.
     * @param {string} campaignId
     * @returns {Promise<Object>} Campaign with ranked matches.
     */
    async matchInfluencers(campaignId) {
        // 1. Get campaign
        const campaign = await CampaignRepository.findById(campaignId);
        if (!campaign) {
            throw new Error('Campaign not found');
        }

        // 2. Fetch all available influencers
        const influencers = await InfluencerRepository.findAll();
        if (!influencers.length) {
            throw new Error('No influencers available for matching');
        }

        // 3. Run AI engine — returns top 10 ranked results
        const rankedMatches = rankInfluencers(campaign, influencers, 10);

        // 4. Store matches in the database
        await MatchRepository.saveMatches(rankedMatches);

        // 5. Update campaign status to ACTIVE
        await CampaignRepository.updateStatus(campaignId, 'ACTIVE');

        return {
            campaignId,
            status: 'ACTIVE',
            totalInfluencersEvaluated: influencers.length,
            topMatches: rankedMatches,
        };
    },

    /**
     * Full campaign flow: create + match.
     * @param {{ brandId: string, title: string, description: string, budget: number, niche?: string }} data
     * @returns {Promise<Object>} Campaign with matches.
     */
    async createAndMatch(data) {
        const campaign = await this.createCampaign(data);
        const result = await this.matchInfluencers(campaign.id);
        return result;
    },

    /**
     * Get campaign details with match results.
     * @param {string} campaignId
     * @returns {Promise<Object>}
     */
    async getCampaignWithMatches(campaignId) {
        const campaign = await CampaignRepository.findById(campaignId);
        if (!campaign) {
            throw new Error('Campaign not found');
        }

        const matches = await MatchRepository.findByCampaignId(campaignId);
        return {
            ...campaign,
            matches,
        };
    },

    /**
     * Get all campaigns for a brand.
     * @param {string} brandId
     * @returns {Promise<Array>}
     */
    async getBrandCampaigns(brandId) {
        return CampaignRepository.findByBrandId(brandId);
    },
};
