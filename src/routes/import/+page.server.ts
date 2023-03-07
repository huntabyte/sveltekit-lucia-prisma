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
	const events = await prisma.event.findMany({ include: { user: true } })
	return {
		events
	}
}

export const actions: Actions = {
	default: async (input) => {
		// console.log('input: ', await input.locals.validate())
		const { request, locals, params, cookies } = input
		const fd = await request.formData()

		// const user = await db.getUserFromSession(cookies.get('sessionid'));
		const formData: any = Object.fromEntries(fd)
		// console.log('formData: ', formData)
		const { file } = formData
		// console.log('file: ', file)
		const texted = await file.text()
		const parsed = parse(texted, {
			complete: async (results) => {
				const uid = await input.locals.validate()
				// console.log('results.data: ', results.data)
				Populate({ data: results.data, userId: uid?.userId, file: file })
				// return results.data
			},
			error: (status, err) => {
				// TODO
				console.log('error: ', status, err)
			}
		})
		// console.log('parsed: ', parsed)

		// nodeFile.pipe(parsed)

		// let data: any[] = []
		// parsed.on('data', (chunk) => {
		// 	data.push(chunk)
		// })

		// parsed.on('finish', () => {
		// 	console.log(data)
		// 	console.log(data.length)
		// })
		// const pop = Populate({ file: nodeFile, userId: 'uid' })
		// Need to format path for file
		// console.log('workingDir: ', process.cwd())
		// const response = await fetch('/api/import', {
		// 	method: 'POST',
		// 	body: JSON.stringify(formData),
		// 	headers: {
		// 		'content-type': 'application/json'
		// 	}
		// })
		// }
		// get the file
		// use blw.ts to get csv data
	}
}
