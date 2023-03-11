import { z } from 'zod'
import { auth } from '$lib/server/lucia'
import { fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.validate()
	if (session) {
		throw redirect(302, '/')
	}
}

const registerSchema = z
	.object({
		name: z
			.string({ required_error: 'Name is required' })
			.min(1, { message: 'Name is required' })
			.max(64, { message: 'Name must be less than 64 characters' })
			.trim(),
		username: z
			.string({ required_error: 'Name is required' })
			.min(1, { message: 'Name is required' })
			.max(64, { message: 'Name must be less than 64 characters' })
			.trim(),
		email: z
			.string({ required_error: 'Email is required' })
			.min(1, { message: 'Email is required' })
			.max(64, { message: 'Email must be less than 64 characters' })
			.email({ message: 'Email must be a valid email address' }),
		password: z
			.string({ required_error: 'Password is required' })
			.min(6, { message: 'Password must be at least 6 characters' })
			.max(32, { message: 'Password must be less than 32 characters' })
			.trim(),
		passwordConfirm: z
			.string({ required_error: 'Password is required' })
			.min(6, { message: 'Password must be at least 6 characters' })
			.max(32, { message: 'Password must be less than 32 characters' })
			.trim(),
		terms: z.enum(['on'], { required_error: 'You must accept the terms and conditions' })
	})
	.superRefine(({ passwordConfirm, password }, ctx) => {
		if (passwordConfirm !== password) {
			ctx.addIssue({
				code: 'custom',
				message: 'Password and Confirm Password must match',
				path: ['password']
			})
			ctx.addIssue({
				code: 'custom',
				message: 'Password and Confirm Password must match',
				path: ['passwordConfirm']
			})
		}
	})

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData()) as Record<string, string>

		try {
			const result = registerSchema.parse(formData)
			await auth.createUser({
				key: {
					providerId: 'username',
					providerUserId: result.username,
					password: result.password
				},
				attributes: {
					name: result.name,
					username: result.username
				}
			})
		} catch (err: any) {
			const { fieldErrors: errors } = err.flatten()
			const { password, passwordConfirm, ...rest } = formData
			return {
				data: rest,
				errors
			}
		}

		throw redirect(302, '/login')
	}
}
