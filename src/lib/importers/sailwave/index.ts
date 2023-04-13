import { prisma } from '$lib/server/prisma'
import { error } from '@sveltejs/kit'
import Blw from './Blw'

interface CreateEventProps {
	data: any
	userId: string
	file: any
	orgId: string
}

export function CheckForDuplicates({ data, userId, file, orgId }) {
	//
}

export function CreateEvent({ data, userId, file, orgId }: CreateEventProps) {
	// use prisma create here..
	// but can we still connect??
	// figure out a way to unique -ish comps
}

export const Populate = ({ data, userId, file, orgId }) => {
	// so upsert is easy but this doesn't make sense.
	// people will either be creating, updating or overwritting
	// ??????? could have Duplicate problems by using this method
	// also cuurently not supporting updating at all

	// no file so exit
	if (!data) throw error(400, { message: 'Populate function requires data' })

	// Make new Blw class
	const blw = new Blw({ data, file })
	const event = blw.getEvent()
	// console.log('event: ', event)
	const { eventeid, uniqueIdString } = event

	function upsertObj() {
		const upObj = {
			...event,

			Publisher: {
				connect: { id: userId }
			},
			Organization: {
				connect: { id: orgId }
			},
			Venue: {
				connectOrCreate: {
					where: { name: event.venueName },
					create: {
						name: event.venueName,
						email: event.rest.venueemail,
						website: event.rest.venuewebsite,
						burgee: event.rest.venueburgee
					}
				}
			},

			Races: {
				create: blw.getRaces().map((race) => {
					return {
						...race,
						Publisher: {
							connect: { id: userId }
						},
						Comps: {
							connectOrCreate: blw.getComps().map((comp) => {
								// console.log('comp: ', comp)
								return {
									where: { compId: comp.compId },
									create: {
										compId: comp.compId,
										club: comp.club,
										boat: comp.boat,
										skipper: comp.helmname,
										fleet: comp.fleet,
										division: comp.division,
										rank: comp.rank,
										nett: comp.nett,
										total: comp.total,
										rest: comp,
										Publisher: {
											connect: { id: userId }
										}
									}
								}
							})
						},
						Results: {
							create: blw.getResults(race.raceId).map((result) => {
								//  Note convert to numbers
								return {
									resultId: result.resultId,
									points: result.points,
									finish: result.finish,
									start: result.start,
									position: result.position,
									discard: result.discard,
									elasped: result.elasped,
									corrected: result.corrected,
									resultType: result.resultType,
									elapsedWin: result.elapsedWin,
									ratingWin: result.ratingWin,

									Publisher: {
										connect: { id: userId }
									},
									Event: {
										connect: { uniqueIdString: event.uniqueIdString }
									},
									Comp: {
										connect: { compId: result.compId }
									}
								}
							})
						}
					}
				})
			}
		}
		return {
			data: upObj
			// where: { uniqueIdString: uniqueIdString },
			// update: {},
			// create: upObj
		}
	}

	addTables()

	async function addTables() {
		try {
			// await prisma.event.upsert(upsertObj())
			await prisma.event.create(upsertObj())
		} catch (error: any) {
			console.log('Import Error: ', error.message)
		}
	}
} // populate
