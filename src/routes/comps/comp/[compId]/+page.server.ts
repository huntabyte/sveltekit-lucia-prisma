import { prisma } from '$lib/server/prisma'
import type { PageServerLoad } from './$types'

export const load = (async ({ params }) => {
	const getComp = async () => {
		try {
			return await prisma.comp.findUniqueOrThrow({
				where: { id: params.compId }
			})
		} catch (error) {
			console.log('error: ', error)
		}
	}
	return {
		comp: getComp()
	}
}) satisfies PageServerLoad
