import { prisma } from '$lib/server/prisma'
import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

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
