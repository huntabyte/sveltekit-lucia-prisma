import { prisma } from '$lib/server/prisma'
import { error } from '@sveltejs/kit'
import Blw from './Blw'

declare global {
	namespace PrismaJson {
		// you can use classes, interfaces, types, etc.
		type EventJson = {
			venueemail: string
			venuewebsite: string
			venueburgee: string
		}
	}
}

export const Populate = async ({ data, userId, file, orgId }) => {
	// so upsert is easy but this doesn't make sense.
	// people will either be creating, updating or overwritting
	// ??????? could have Duplicate problems by using this method
	// also cuurently not supporting updating at all

	// no file so exit
	if (!data) throw error(400, { message: 'Populate function requires data' })

	// Make new Blw class
	const blw = new Blw({ data, file })
	// console.log('data: ', data)
	function upsertObj() {
		const event = blw.getEvent()
		// console.log('event: ', event)c
		const { eventeid } = event
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
					where: { name: event.name },
					create: {
						name: event.venueName,
						// @ts-ignore
						email: event.rest.venueemail,
						// @ts-ignore
						website: event.rest.venuewebsite,
						// @ts-ignore
						burgee: event.rest.venueburgee
					}
				}
			},
			Comp: {
				create: blw.getComps().map((comp) => {
					return {
						compId: comp.compId,
						boat: comp.boat ?? '',
						skipper: comp.helmname ?? '',
						fleet: comp.fleet ?? '',
						club: comp.club ?? '',
						rest: comp
						// Publisher: {
						// 	connect: { id: userId }
						// }
					}
				})
			},
			Race: {
				create: blw.getRaces().map((race) => {
					return {
						...race,
						Results: {
							create: blw.getResults(race.raceId).map((result) => {
								return {
									resultId: result.resultId,
									finish: result.finish,
									start: result.start,
									points: result.points,
									position: result.position,
									discard: result.discard,
									corrected: result.corrected,
									rrestyp: result.rrestyp,
									elasped: result.elasped,
									Comp: {
										connect: { compId: result.compId }
									},
									Event: {
										connect: { eventeid: event.eventeid }
									}
								}
							})
						}
					}
				})
			}
		}
		return {
			where: { eventeid: eventeid },
			update: {},
			create: upObj
		}
	}

	addTables()

	async function addTables() {
		try {
			// console.log('upsertObj(): ', upsertObj())
			await prisma.event.upsert(upsertObj())
		} catch (error: any) {
			console.log('error: ', error.message)
		}
	}
} // populate
