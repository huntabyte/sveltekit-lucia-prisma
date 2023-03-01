// import { Populate } from '$lib/importers/sailwave'
import { error } from '@sveltejs/kit'
import { NODE_STREAM_INPUT, parse } from 'papaparse'
import type { RequestHandler } from './$types'

export const POST = (async ({ request }) => {
	// const pop = Populate({ file: request.body, userId: 'hey' })
	// const stream = await request.body?.getReader(parse())
	return new Response()
}) satisfies RequestHandler
