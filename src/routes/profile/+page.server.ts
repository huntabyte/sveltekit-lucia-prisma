import { prisma } from '$lib/server/prisma'
import { serializeNonPOJOs } from '$lib/utils'
import { fail, redirect } from '@sveltejs/kit'
import type { ActionData, PageServerLoad } from './$types'

export const load = (async ({ locals }) => {
	const { user, session } = await locals.validateUser()
	if (!(user && session)) {
		throw redirect(302, '/')
	}
	const getProfile = async () => {
		try {
			return await prisma.user.findUniqueOrThrow({
				where: { id: user.userId }
			})
		} catch (error) {
			console.log('error: ', error)
			return {
				user,
				error
			}
		}
	}
	return {
		profile: getProfile()
	}
}) satisfies PageServerLoad

export const actions = {
	default: async ({ request, locals }) => {
		const { user } = await locals.validateUser()
		const fd = await request.formData()
		const formData = Object.fromEntries(fd)
		console.log('formData: ', formData.name)

		try {
			await prisma.user.update({
				where: { id: user?.userId },
				data: {
					name: formData.name as string,
					email: formData.email as string,
					avatar: formData.avatar as string
				}
			})
		} catch (error: any) {
			console.log('error: ', error)
			return {
				data: serializeNonPOJOs(formData),
				error: serializeNonPOJOs(error)
			}
		}
		return {
			status: 201
		}
	}
}
