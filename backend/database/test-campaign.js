
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const campaigns = await prisma.campaign.findMany({ take: 1 });
        console.log("Success! Campaigns:", campaigns);
    } catch (e) {
        console.error("Query failed:", e);
    } finally {
        await prisma.$disconnect();
    }
}
main();
