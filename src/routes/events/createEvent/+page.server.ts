import { prisma } from '$lib/server/prisma'
import type { PageServerLoad } from './$types'

export const load = (async ({ parent }) => {
	const user = (await parent()).user

	const getOrgs = async () => {
		return await prisma.organization.findMany({
			where: { ownerId: user?.userId },
			select: {
				id: true,
				name: true
			}
		})
	}

	return {
		orgs: await getOrgs()
	}
}) satisfies PageServerLoad
