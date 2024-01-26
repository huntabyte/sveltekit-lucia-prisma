import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals }) => {
	try {
		const session = await locals.auth.validate()
		if (!session || !session.user) {
			// Handle the case where there is no session or user is not part of the session
			// For example, redirect to login or return a minimal response
			return { user: null }
		}
		const user = session.user
		return { user }
	} catch (error) {
		console.error('Error validating session:', error)
		// Handle error appropriately, such as returning a minimal response or redirecting
		return { user: null }
	}
}
