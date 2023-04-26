import { prisma } from '$lib/server/prisma'
import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load = (async ({ params }) => {
	const { eventId } = params
	const getEvent = async () => {
		try {
			return prisma.event.findUniqueOrThrow({
				where: { id: eventId }
			})
		} catch (err) {
			console.error('error: ', err)
			throw error(418, 'error')
		}
	}
	const getRaces = async () => {
		try {
			return prisma.race.findMany({
				where: { eventId: eventId },
				orderBy: { name: 'asc' }
			})
		} catch (err) {
			console.error('error: ', err)
			throw error(418, 'error')
		}
	}
	return {
		event: getEvent(),
		races: getRaces()
	}
}) satisfies PageServerLoad
