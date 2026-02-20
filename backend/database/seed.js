import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const roles = [
        { name: 'BRAND', permissions: ['CREATE_CAMPAIGN', 'VIEW_ANALYTICS'] },
        { name: 'INFLUENCER', permissions: ['APPLY_CAMPAIGN', 'UPDATE_PROFILE'] },
        { name: 'ADMIN', permissions: ['ALL'] },
    ];

    console.log('Seeding roles...');

    for (const role of roles) {
        await prisma.role.upsert({
            where: { name: role.name },
            update: {},
            create: {
                name: role.name,
                permissions: role.permissions,
            },
        });
    }

    console.log('Seeding completed.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
