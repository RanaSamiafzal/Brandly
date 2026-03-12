import { BrandService } from './src/services/brand/brand-service.js';
import { CampaignService } from './src/services/campaign/campaign-service.js';
import { prisma } from '@repo/database';

async function test() {
    try {
        console.log("Looking for brand users...");
        const roles = await prisma.role.findMany();
        const brandRole = roles.find(r => r.name === 'BRAND');
        if (!brandRole) {
            console.log("Brand role not found in DB.");
            return;
        }
        const brands = await prisma.user.findMany({ where: { roleId: brandRole.id } });
        if (!brands.length) {
            console.log("No brands found.");
            return;
        }
        for (const brand of brands) {
            console.log(`\nTesting for brand: ${brand.email} (ID: ${brand.id})`);
            console.log("1. Calling BrandService.getBrandProfile...");
            const profile = await BrandService.getBrandProfile(brand.id);
            console.log("   - Profile retrieved successfully! ID:", profile?.id);

            console.log("2. Calling CampaignService.getBrandCampaigns...");
            const campaigns = await CampaignService.getBrandCampaigns(profile.id);
            console.log("   - Campaigns retrieved successfully! Count:", campaigns?.length);
            
            console.log("3. Calling CampaignService.getAIRecommendations...");
            const recs = await BrandService.getAIRecommendations(profile.id).catch(e => {
                console.error("   - Error in getAIRecommendations:", e.message);
                return null;
            });
            console.log("   - Recommendations check done.");
        }
        console.log("\nAll tests passed successfully locally!");
    } catch (e) {
        console.error("\n### ERROR CAUGHT ###");
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}
test();
