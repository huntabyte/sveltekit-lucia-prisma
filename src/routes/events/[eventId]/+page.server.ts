import { prisma } from '$lib/server/prisma'
import type { PageServerLoad } from './$types'

export const load = (async ({ params }) => {
	console.log('params: ', params)
	const getEvent = async () => {
		try {
			const event = await prisma.event.findUniqueOrThrow({ where: { id: params.eventId } })
			return event
		} catch (error) {
			console.log('error: ', error)
		}
	}
	return {
		event: getEvent()
	}
}) satisfies PageServerLoad
