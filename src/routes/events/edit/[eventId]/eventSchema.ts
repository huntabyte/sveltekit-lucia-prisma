import { z } from 'zod'

export const eventSchema = z.object({
	name: z.string(),
	eventwebsite: z.string().nullable(),
	email: z.string().email().nullable(),
	venueName: z.string().nullable(),
	description: z.string().nullable(),
	titleImage: z.string().nullable(),
	public: z.boolean(),
	// resultColumns: z.any()
	rank: z.string().nullable(),
	points: z.string().nullable(),
	position: z.string().nullable(),
	skipper: z.string().nullable(),
	boat: z.string().nullable(),
	finish: z.string().nullable(),
	corrected: z.string().nullable(),
	elapsed: z.string().nullable(),
	nett: z.string().nullable(),
	total: z.string().nullable()
	// Venue: z.any()
})
