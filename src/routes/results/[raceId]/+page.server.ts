import { prisma } from '$lib/server/prisma'
import type { PageServerLoad } from './$types'

export const load = (async ({ params }) => {
	async function getRace() {
		// how to pass to routes
		return await prisma.race.findFirst({
			where: { id: params.raceId },
			include: { Event: true }
		})
	}

	const getResults = async () => {
		try {
			const result = await prisma.result.findMany({
				where: { raceId: params.raceId },
				include: { Comp: true },
				orderBy: { position: 'asc' }
			})
			if (result) return result
			return [{ error: 'no results' }]
		} catch (error) {
			console.error('error: ', error)
			return [{ error: 'no results' }]
		}
	}
	return {
		results: await getResults(),
		race: await getRace()
	}
}) satisfies PageServerLoad
