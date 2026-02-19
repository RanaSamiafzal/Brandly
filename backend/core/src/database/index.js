const { PrismaClient } = require("@prisma/client");

const prismaGlobal = global.prisma;

const prisma = prismaGlobal || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
    global.prisma = prisma;
}

module.exports = { prisma };
