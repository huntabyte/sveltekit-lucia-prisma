import { prisma } from '$lib/server/prisma'
import type { PageServerLoad } from './$types'

export const load = (async ({ params }) => {
	const getOrg = async () => {
		try {
			return await prisma.organization.findUniqueOrThrow({
				where: { id: params.orgId },
				include: { Events: true }
			})
		} catch (error) {
			console.error('error: ', error)
		}
	}
	return {
		org: getOrg()
	}
}) satisfies PageServerLoad
