import { prisma } from "../index.js";

export const BrandRepository = {
    async findByUserId(userId) {
        return prisma.brandProfile.findUnique({
            where: { userId },
            include: { user: true }
        });
    },

    async updateProfile(userId, data) {
        // Map frontend "about" to backend "description"
        if (data.about !== undefined) {
            data.description = data.about;
            delete data.about;
        }

        // Get user for fallback brand name
        const user = await prisma.user.findUnique({ where: { id: userId } });
        const fallbackName = user?.fullname || user?.email?.split('@')[0] || "New Brand";

        // Clean data to only include valid fields for BrandProfile
        const validFields = ['brandName', 'industry', 'website', 'address', 'description', 'logo', 'budgetMin', 'budgetMax'];
        const cleanData = {};
        Object.keys(data).forEach(key => {
            if (validFields.includes(key)) {
                cleanData[key] = data[key];
            }
        });

        // Use transaction to update both BrandProfile and User (if logo changed)
        return prisma.$transaction(async (tx) => {
            const profile = await tx.brandProfile.upsert({
                where: { userId },
                update: cleanData,
                create: {
                    userId,
                    brandName: cleanData.brandName || fallbackName,
                    ...cleanData
                }
            });

            // Sync with User table if logo is present
            if (cleanData.logo) {
                await tx.user.update({
                    where: { id: userId },
                    data: { profilePic: cleanData.logo }
                });
            }

            return profile;
        });
    },

    async getDashboardStats(brandId) {
        // Aggregate active campaigns
        const campaigns = await prisma.campaign.findMany({
            where: { brandId }
        });
        const activeCampaigns = campaigns.filter(c => c.status === "ACTIVE").length;

        // Aggregate pending requests
        const requests = await prisma.collaborationRequest.count({
            where: {
                campaign: { brandId },
                status: "PENDING"
            }
        });

        // We can mock "Influencers Found" for now or calculate based on matches
        const influencersFound = await prisma.matchScore.count({
            where: {
                campaign: { brandId }
            }
        });

        return {
            totalRequests: requests || 0,
            activeCampaigns: activeCampaigns || 0,
            pendingApprovals: requests || 0, // In this UI context, same as pending requests
            influencersFound: influencersFound || 0
        };
    },

    async search(filters) {
        const where = {};
        if (filters.industry && filters.industry !== "All Industries") {
            where.industry = {
                contains: filters.industry,
                mode: 'insensitive'
            };
        }

        if (filters.query) {
            where.OR = [
                { brandName: { contains: filters.query, mode: 'insensitive' } },
                { description: { contains: filters.query, mode: 'insensitive' } }
            ];
        }

        return prisma.brandProfile.findMany({
            where,
            include: {
                user: { select: { fullname: true, profilePic: true } },
                _count: {
                    select: {
                        campaigns: true
                    }
                }
            }
        });
    }
};
