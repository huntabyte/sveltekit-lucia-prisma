import { prisma } from '$lib/server/prisma'
import type { PageServerLoad } from './$types'

export const load = (async ({ params }) => {
	const getComps = async () => {
		try {
			return await prisma.comp.findMany({
				where: { eventId: params.eventId }
			})
		} catch (error) {
			console.error('error: ', error)
		}
	}
	return {
		comps: getComps()
	}
}) satisfies PageServerLoad
