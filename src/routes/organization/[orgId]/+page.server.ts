import { prisma } from '$lib/server/prisma'
import type { Organization } from '@prisma/client'
import type { Actions, PageServerLoad } from './$types'

export const load = (async ({ params }) => {
	if (params.orgId === 'new') return { org: { name: 'New Organization' } as Organization }
	const org = prisma.organization.findFirst({ where: { id: params.orgId } })
	return {
		org
	}
}) satisfies PageServerLoad

export const actions: Actions = {
	default: async ({ request, locals, params }) => {
		console.log('params: ', params)
		const fd: any = await request.formData()
		const { name, description, website, email } = Object.fromEntries(fd)
		const uid: any = await locals.validate()

		try {
			await prisma.organization.upsert({
				where: { name: name },
				update: { name, description, website, email },
				create: {
					name,
					description,
					website,
					email,
					Owner: {
						connect: { id: uid.userId }
					}
				}
			})

			// throw redirect(200, previousPage)
			// return {
			// 	status: 200,
			// 	message: 'Organization update success'
			// }
		} catch (error) {
			console.log('error: ', error)
		}
	}
}
