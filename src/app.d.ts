import type { PrismaClient } from "@prisma/client"

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
	var __prisma: PrismaClient
}

export {}
