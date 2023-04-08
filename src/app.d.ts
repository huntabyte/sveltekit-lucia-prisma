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

		type resultColumns = {
			boat: boolean
			fleet: boolean
			points: boolean
			corrected: boolean
			finish: boolean
		}

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
