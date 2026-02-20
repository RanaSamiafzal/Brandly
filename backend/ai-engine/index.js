/**
 * AI Matching Engine v1
 * Formula:
 * Score = (Niche * 0.30) + (Demographic * 0.25) + (Engagement * 0.20) + (Budget * 0.15) + (History * 0.10)
 */

const WEIGHTS = {
    NICHE: 0.30,
    DEMOGRAPHIC: 0.25,
    ENGAGEMENT: 0.20,
    BUDGET: 0.15,
    HISTORY: 0.10,
};

function calculateNicheScore(campaignNiche, influencerNiche) {
    if (!campaignNiche || !influencerNiche) return 0;
    const cNiche = campaignNiche.toLowerCase();
    const iNiche = influencerNiche.toLowerCase();

    if (cNiche === iNiche) return 100;
    if (iNiche.includes(cNiche) || cNiche.includes(iNiche)) return 70;
    return 0;
}

function calculateDemographicScore(campaignAudience, influencerDemographics) {
    // Placeholder: In real world, this would compare age/gender/location maps
    // Returning a neutral score for now as we don't have deep demographic data yet
    return 50;
}

function calculateEngagementScore(engagementRate) {
    // Normalize: 0-10% -> 0-100 score
    return Math.min((engagementRate * 10), 100);
}

function calculateBudgetScore(budget, pricing) {
    if (!pricing) return 50;
    if (pricing <= budget) return 100;
    // Penalty logic
    const diff = pricing - budget;
    const penalty = (diff / budget) * 100;
    return Math.max(100 - penalty, 0);
}

function calculateHistoryScore(historicalSuccessRate) {
    // Assuming a 0-1 or 0-100 input
    return historicalSuccessRate || 50;
}

function calculateCompatibility(campaign, influencer) {
    const nicheScore = calculateNicheScore(campaign.niche || "", influencer.niche);
    const demographicScore = calculateDemographicScore({}, {});
    const engagementScore = calculateEngagementScore(influencer.engagementRate || 0);
    const budgetScore = calculateBudgetScore(campaign.budget || 0, influencer.pricing);
    const historyScore = calculateHistoryScore(0); // Placeholder for historical data

    const totalScore =
        (nicheScore * WEIGHTS.NICHE) +
        (demographicScore * WEIGHTS.DEMOGRAPHIC) +
        (engagementScore * WEIGHTS.ENGAGEMENT) +
        (budgetScore * WEIGHTS.BUDGET) +
        (historyScore * WEIGHTS.HISTORY);

    return {
        score: Math.round(totalScore),
        breakdown: {
            niche: nicheScore,
            demographic: demographicScore,
            engagement: engagementScore,
            budget: budgetScore,
            history: historyScore
        }
    };
}

export {
    calculateCompatibility,
    WEIGHTS
};
