import { superValidate } from 'sveltekit-superforms/server'
import { error, fail, redirect } from '@sveltejs/kit'
import { prisma } from '$lib/server/prisma.js'
import { eventSchema } from './eventSchema.js'

export const load = async ({ params }) => {
	const event = await prisma.event.findUnique({
		where: { id: params.eventId },
		include: { Venue: true }
	})
	const form = await superValidate(event, eventSchema)
	if (params.eventId === 'new') {
		// console.log('params.eventId: ', params.eventId)
		// console.log('event: ', event)
		console.log('form: ', form)
	} else {
		if (!event) throw error(404, 'Not found')
	}

	// Always return { form } in load and form actions.
	return { form }
}

export const actions = {
	default: async ({ request, params, url }) => {
		const form = await superValidate(request, eventSchema)
		// Convenient validation check:
		if (!form.valid) {
			// Again, always return { form } and things will just work.
			return fail(400, { form })
		}
		// console.log('form: ', form)
		const {
			rank,
			points,
			position,
			skipper,
			boat,
			finish,
			corrected,
			elapsed,
			nett,
			total,
			...rest
		} = form.data

		try {
			await prisma.event.update({
				where: { id: params.eventId },
				data: {
					...rest,
					resultColumns: {
						rank,
						points,
						position,
						skipper,
						boat,
						finish,
						corrected,
						elapsed,
						nett,
						total
					}
				}
			})
		} catch (err) {
			console.log('err: ', err)
			throw error(400, 'Error updating the event')
		}
		// const redirectTo = url.searchParams.get('from')
		// if (redirectTo) {
		// 	throw redirect(302, `/${redirectTo.slice(1)}`)
		// }
		// throw redirect(302, '/')
		return { form }
	}
}
