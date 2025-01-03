const { PrismaClient } = import('@prisma/client')

const globalForPrisma = global

export const prisma = globalForPrisma.prisma || new PrismaClient()