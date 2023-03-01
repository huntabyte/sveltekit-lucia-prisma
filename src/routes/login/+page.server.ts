import { auth } from '$lib/server/lucia'
import { fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

// import { z } from 'zod'

// const registerSchema = z.object({
// 	username: z
// 		.string({ required_error: 'Name is required' })
// 		.min(1, { message: 'Name is required' })
// 		.max(64, { message: 'Name must be less than 64 characters' })
// 		.trim(),
// 	password: z
// 		.string({ required_error: 'Password is required' })
// 		.min(6, { message: 'Password must be at least 6 characters' })
// 		.max(32, { message: 'Password must be less than 32 characters' })
// 		.trim()
// })

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.validate()
	if (session) {
		throw redirect(302, '/')
	}
}

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const formData = Object.fromEntries(await request.formData()) as Record<string, string>

		try {
			const key = await auth.validateKeyPassword('username', formData.username, formData.password)
			const session = await auth.createSession(key.userId)
			locals.setSession(session)
		} catch (err: any) {
			const { password, ...rest } = formData
			return {
				data: rest,
				errors: err
			}
		}
		throw redirect(302, '/')
	}
}
