import { prisma } from '$lib/server/prisma'
import { fail } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from '../$types'

export const load: PageServerLoad = async ({ params, locals }) => {
	const user = locals.validateUser()

	try {
		const orgs = await prisma.organization.findMany({
			where: { ownerId: (await user)?.user?.userId }
		})

		return {
			orgs: orgs
		}
	} catch (error) {
		console.log('error: ', error)
		return fail(500, { message: 'oh crap' })
	}
}
