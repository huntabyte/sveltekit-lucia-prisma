import { PrismaClient } from "@prisma/client"

const prisma = global.__prisma || new PrismaClient()

if (process.env.NODE_ENV === "development") {
	global.__prisma = prisma
}

export { prisma }
