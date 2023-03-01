import type { Actions, PageServerLoad } from '../$types'
import { prisma } from '$lib/server/prisma'
import { error, fail, redirect } from '@sveltejs/kit'
import { Populate } from '$lib/importers/sailwave'
import { browser } from '$app/environment'
import fs from 'node:fs'
import { NODE_STREAM_INPUT, parse } from 'papaparse'

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.validate()
	// console.log('session: ', session)
	// If not logged in redirect
	if (!session) {
		throw redirect(302, '/')
	}
}

export const actions: Actions = {
	default: async ({ request, locals }) => {
		// console.log('locals: ', locals)
		const { file }: any = Object.fromEntries(await request.formData())

		const texted = await file.text()

		const parsed = parse(texted, {
			complete: (results) => {
				// console.log('results.data: ', results.data)
				Populate({ data: results.data, userId: 'hey' })
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
