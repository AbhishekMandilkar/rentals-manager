import { PrismaClient } from "@prisma/client";

const prisma = global.prisma || new PrismaClient({
    log: [
        'query',
        'error'
    ]
});

if (process.env.NODE_ENV === "development") global.prisma = prisma;

export default prisma;