import type { Actions, PageServerLoad } from '../$types'
import { redirect } from '@sveltejs/kit'
import { Populate } from '$lib/importers/sailwave'

import { parse } from 'papaparse'
import { prisma } from '$lib/server/prisma'

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.validate()
	// If not logged in redirect
	if (!session) {
		throw redirect(302, '/')
	}
	const events = await prisma.event.findMany({ include: { Publisher: true } })
	const orgs = await prisma.organization.findMany({
		where: { ownerId: session.userId }
	})
	return {
		events,
		orgs
	}
}

export const actions: Actions = {
	default: async (input) => {
		const { request, locals, params, cookies } = input
		const fd = await request.formData()

		const { org, file }: any = Object.fromEntries(fd)

		//  TODO:
		// Impement multiple file upload
		// just to make this an inteartive function here
		//
		// console.log('fd: ', fd.getAll('file'))

		// const { file, org } = formData

		// fd.getAll('file').forEach(async (file: any) => {
		// 	console.log('file: ', file)
		const texted = await file.text()
		parse(texted, {
			complete: async (results) => {
				const uid = await input.locals.validate()
				Populate({ data: results.data, userId: uid?.userId, file: file, orgId: org })
			},
			error: (status, err) => {
				// TODO
				console.log('import error: ', status, err)
			}
		})
		// })

		return { status: 201 }
	}
}
