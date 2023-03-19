import { invalidateAll } from '$app/navigation'
import { prisma } from '$lib/server/prisma'
import type { Lang } from '@prisma/client'
import { fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

export const load = (async ({ locals }) => {
	const { user } = await locals.validateUser()

	const getUserSettings = async () => {
		if (!user) {
			throw redirect(300, '/')
		}
		const settings = await prisma.userSettings.findUnique({
			where: { userId: user.userId }
		})
		console.log('settings: ', settings)
		return settings
	}
	return {
		settings: getUserSettings()
	}
}) satisfies PageServerLoad

export const actions: Actions = {
	default: async ({ locals, request, cookies }) => {
		const { user, session } = await locals.validateUser()
		console.log('user: ', user)
		if (!(user && session)) {
			throw redirect(302, '/')
		}

		const { language, theme } = Object.fromEntries(await request.formData()) as Record<
			string,
			string
		>
		if (theme) {
			cookies.set('colorTheme', theme, {
				path: '/',
				maxAge: 60 * 60 * 24 * 365
			})
		}
		try {
			await prisma.userSettings.upsert({
				where: { userId: user.userId },
				update: {
					language: language as Lang,
					theme: theme
				},
				create: {
					language: language as Lang,
					theme: theme,
					user: {
						connect: { id: user.userId }
					}
				}
			})
		} catch (error) {
			console.log('error: ', error)
			return fail(400, { message: 'Fail on settings save' })
		}
	}
}
