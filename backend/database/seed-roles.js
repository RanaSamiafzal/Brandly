import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    console.log('Seeding roles...');
    await prisma.role.upsert({
        where: { name: 'BRAND' },
        update: {},
        create: {
            name: 'BRAND',
            permissions: ['CREATE_CAMPAIGN', 'VIEW_INFLUENCERS']
        }
    });

    await prisma.role.upsert({
        where: { name: 'INFLUENCER' },
        update: {},
        create: {
            name: 'INFLUENCER',
            permissions: ['SEARCH_CAMPAIGNS', 'MANAGE_PROFILE']
        }
    });

    console.log('Roles seeded successfully.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
