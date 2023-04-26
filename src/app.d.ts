import type { Comp } from '@prisma/client'
import type { Organization, PrismaClient } from '@prisma/client'

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			validate: import('@lucia-auth/sveltekit').Validate
			validateUser: import('@lucia-auth/sveltekit').ValidateUser
			setSession: import('@lucia-auth/sveltekit').SetSession
		}
		interface PageData {}
		// interface Platform {}
	}
	var __prisma: PrismaClient

	namespace PrismaJson {
		type compRest = {
			rating?: string
			sailNo?: string
			nett?: string
			total?: string
		}

		type venueRest = {}

		export type eventRest = {
			venuewebsite?: string
			venueemail?: string
			venueburgee?: string
			eventburgee?: string
		}

		const resultColumns = z.object({
			boat: z.boolean().nullable(),
			skipper: z.boolean().nullable(),
			fleet: z.boolean().nullable(),
			points: z.boolean().nullable(),
			elapsed: z.boolean().nullable(),
			corrected: z.boolean().nullable(),
			finish: z.boolean().nullable(),
			rank: z.boolean().nullable(),
			position: z.boolean().nullable(),
			nett: z.boolean().nullable(),
			total: z.boolean().nullable()
		})

		export type resultColumns = z.infer<typeof resultColumns>

		// export type resultColumns = {
		// 	boat?: boolean | string
		// 	skipper?: boolean | string
		// 	fleet?: boolean | string
		// 	points?: boolean | string
		// 	elapsed?: boolean | string
		// 	corrected?: boolean | string
		// 	finish?: boolean | string
		// 	rank?: boolean | string
		// 	position?: boolean | string
		// 	nett?: boolean | string
		// 	total?: boolean | string
		// }

		type fileInfo = {
			lastModified: string
		}
	}

	/// <reference types="lucia-auth" />
	declare namespace Lucia {
		type Auth = import('$lib/server/lucia').Auth
		type UserAttributes = {
			username: string
			name: string
			email: string
			avatar?: string
		}
	}
	declare namespace svelte.JSX {
		interface HTMLAttributes<T> {
			onclick_outside: () => void
		}
	}
}

export {}
