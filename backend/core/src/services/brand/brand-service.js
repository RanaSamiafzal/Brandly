import { BrandRepository } from '@repo/database/repositories/brand-repository.js';

export const BrandService = {
    /**
     * Retrieve a brand's profile by their user ID.
     */
    async getBrandProfile(userId) {
        const profile = await BrandRepository.findByUserId(userId);
        if (!profile) {
            throw new Error('Brand profile not found');
        }
        return profile;
    },

    /**
     * Update or create a brand's specific profile details.
     */
    async updateBrandProfile(userId, profileData) {
        const profile = await BrandRepository.updateProfile(userId, profileData);

        // Log Activity
        const { ActivityService } = await import('../activity/activity-service.js');
        await ActivityService.logActivity({
            userId,
            role: "BRAND",
            type: "PROFILE_UPDATED",
            title: "Profile Updated",
            description: "Your brand profile information has been successfully updated.",
            relatedId: profile.id
        });

        return profile;
    },

    /**
     * Get aggregate statistics for the brand dashboard.
     */
    async getDashboardStats(brandId) {
        return BrandRepository.getDashboardStats(brandId);
    }
};
