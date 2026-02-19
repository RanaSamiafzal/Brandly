const { calculateCompatibility } = require('./index');

/**
 * Rank all influencers for a given campaign and return the top N.
 * Designed to be replaceable with an ML-based engine later.
 *
 * @param {Object} campaign - Campaign object with niche, budget, etc.
 * @param {Array} influencers - Array of InfluencerProfile objects.
 * @param {number} topN - Number of top results to return (default 10).
 * @returns {Array} Ranked list of { influencerId, score, breakdown }.
 */
function rankInfluencers(campaign, influencers, topN = 10) {
    const results = influencers.map((influencer) => {
        const { score, breakdown } = calculateCompatibility(campaign, influencer);
        return {
            influencerId: influencer.id,
            campaignId: campaign.id,
            score,
            breakdown,
        };
    });

    // Sort descending by score, take top N
    results.sort((a, b) => b.score - a.score);
    return results.slice(0, topN);
}

module.exports = {
    rankInfluencers,
};
