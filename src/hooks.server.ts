import { handleHooks } from '@lucia-auth/sveltekit'
import { auth } from '$lib/server/lucia'
import type { Handle } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'

export const customHandle: Handle = async ({ resolve, event }) => {
	let theme: string | null = null
	const newTheme = event.url.searchParams.get('theme')
	const cookieTheme = event.cookies.get('colorTheme')
	if (newTheme) {
		theme = newTheme
	} else if (cookieTheme) {
		theme = cookieTheme
	}

	if (theme) {
		return await resolve(event, {
			transformPageChunk: ({ html }) => html.replace('data-theme=""', `data-theme="${theme}"`)
		})
	}

	return resolve(event)
}

export const handle: Handle = sequence(handleHooks(auth), customHandle)
