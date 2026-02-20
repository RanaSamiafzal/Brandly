import { PrismaClient } from "@prisma/client";

const prismaGlobal = global;

export const prisma = prismaGlobal.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
    prismaGlobal.prisma = prisma;
}
