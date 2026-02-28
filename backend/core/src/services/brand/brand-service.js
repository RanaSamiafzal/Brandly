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
        return BrandRepository.updateProfile(userId, profileData);
    },

    /**
     * Get aggregate statistics for the brand dashboard.
     */
    async getDashboardStats(brandId) {
        return BrandRepository.getDashboardStats(brandId);
    }
};
