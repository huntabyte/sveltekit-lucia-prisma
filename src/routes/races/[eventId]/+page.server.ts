import { prisma } from '$lib/server/prisma'
import type { PageServerLoad } from './$types'

export const load = (async ({ params }) => {
	const { eventId } = params
	const getEvent = async () => {
		try {
			return prisma.event.findUniqueOrThrow({
				where: { id: eventId }
			})
		} catch (error) {
			console.error('error: ', error)
		}
	}
	const getRaces = async () => {
		try {
			return prisma.race.findMany({
				where: { eventId: eventId }
			})
		} catch (error) {
			console.error('error: ', error)
		}
	}
	return {
		event: getEvent(),
		races: getRaces()
	}
}) satisfies PageServerLoad
