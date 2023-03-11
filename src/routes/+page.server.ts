import type { Actions, PageServerLoad } from './$types'
import { prisma } from '$lib/server/prisma'
import { error, fail, redirect } from '@sveltejs/kit'

export const load: PageServerLoad = async () => {
	return {
		articles: await prisma.article.findMany({ include: { user: true } })
		// comps: await prisma.competitor.findMany({ include: { User: true } })
	}
}

export const actions: Actions = {
	setTheme: async ({ url, cookies }) => {
		const theme = url.searchParams.get('theme')
		const redirectTo = url.searchParams.get('redirectTo')

		if (theme) {
			cookies.set('colorTheme', theme, {
				path: '/',
				maxAge: 60 * 60 * 24 * 365
			})
		}

		throw redirect(303, redirectTo ?? '/')
	},
	createArticle: async ({ request, locals }) => {
		const { user, session } = await locals.validateUser()
		if (!(user && session)) {
			throw redirect(302, '/')
		}

		const { title, content } = Object.fromEntries(await request.formData()) as Record<
			string,
			string
		>

		try {
			await prisma.article.create({
				data: {
					title,
					content,
					userId: user.userId
				}
			})
		} catch (err) {
			console.error(err)
			return fail(500, { message: 'Could not create the article.' })
		}

		return {
			status: 201
		}
	},
	deleteArticle: async ({ url, locals }) => {
		const { user, session } = await locals.validateUser()
		if (!(user && session)) {
			throw redirect(302, '/')
		}
		const id = url.searchParams.get('id')
		if (!id) {
			return fail(400, { message: 'Invalid request' })
		}

		try {
			const article = await prisma.article.findUniqueOrThrow({
				where: {
					id: id
				}
			})

			if (article.userId !== user.userId) {
				throw error(403, 'Not authorized')
			}

			await prisma.article.delete({
				where: {
					id: id
				}
			})
		} catch (err) {
			console.error(err)
			return fail(500, {
				message: 'Something went wrong deleting your article'
			})
		}

		return {
			status: 200
		}
	}
}
