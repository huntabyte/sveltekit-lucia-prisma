import { CheckForDuplicates, Populate } from '$lib/importers/sailwave'
import { prisma } from '$lib/server/prisma'
import { error, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'
import { parse } from 'papaparse'

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

export const actions: Actions = {
	default: async (input) => {
		const { request, locals, params, cookies } = input
		const fd = await request.formData()

		const { org, file }: any = Object.fromEntries(fd)

		//  TODO:
		// Impement multiple file upload

		//  TODO:
		// check for duplicates etc.. before

		const texted = await file.text()
		parse(texted, {
			complete: async (results) => {
				const uid = await input.locals.validate()
				const duplicates = await CheckForDuplicates({
					data: results.data,
					userId: uid?.userId,
					file: file,
					orgId: org
				})

				if (duplicates !== null) {
					console.log('duplicates: ', duplicates)
				}

				Populate({ data: results.data, userId: uid?.userId, file: file, orgId: org })
			},
			error: (status, err) => {
				// TODO
				console.log('import error: ', status, err)
				throw error(418, `error from import server ts ${err}`)
			}
		})

		throw redirect(300, '/events')
	}
}
