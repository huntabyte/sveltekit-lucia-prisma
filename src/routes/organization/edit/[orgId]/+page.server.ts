import { z } from 'zod'
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

const orgValidation = z.object({
	name: z
		.string({ required_error: 'Name is required ' })
		.min(1, { message: 'Name is required ' })
		.max(64, { message: ' Name must be less than 64 characters ' })
		.trim(),
	description: z.string().trim().optional(),
	website: z.string().url(),
	email: z
		.string({ required_error: ' Email is required ' })
		.min(1, { message: ' Email is required ' })
		.max(64, { message: ' Email must be less than 64 characters ' })
		.email({ message: ' Email must be a valid email address ' })
})

export const actions: Actions = {
	default: async ({ request, locals, params }) => {
		console.log('params: ', params)
		const formData = Object.fromEntries(await request.formData()) as Record<string, string>
		const uid: any = await locals.validate()

		try {
			const { name, description, website, email } = orgValidation.parse(formData)
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
		} catch (error: any) {
			console.log('error: ', error)
			const { fieldErrors: errors } = error.flatten()
			const { password, passwordConfirm, ...rest } = formData
			return {
				data: rest,
				errors
			}
		}
	}
}
