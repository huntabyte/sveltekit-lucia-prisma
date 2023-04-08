import { prisma } from '$lib/server/prisma'
import { error } from '@sveltejs/kit'
import Blw from './Blw'

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

	async function compsObj() {
		// Comp: {
		// 	create: blw.getComps().map((comp) => {
		// 		// console.log('comp: ', comp)
		// 		return {
		// 			compId: comp.compId,
		// 			boat: comp.boat,
		// 			skipper: comp.helmname,
		// 			fleet: comp.fleet,
		// 			club: comp.club,
		// 			division: comp.division,
		// 			rest: comp,
		// 			Publisher: {
		// 				connect: { id: userId }
		// 			}
		// 		}
		// 	})
		// },
		await blw.getComps().map(async (comp) => {
			return await prisma.comp.upsert({
				where: { compId: comp.compId },
				update: {},
				create: {
					compId: comp.compId,
					boat: comp.boat,
					skipper: comp.helmname,
					fleet: comp.fleet,
					club: comp.club,
					division: comp.division,
					rest: comp,
					Publisher: {
						connect: { id: userId }
					},
					Event: {
						connect: { uniqueIdString: uniqueIdString }
					}
				}
			})
		})
	}

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
			// Comps: {
			// 	create: blw.getComps().map((comp) => {
			// 		// console.log('comp: ', comp)
			// 		return {
			// 			compId: comp.compId,
			// 			boat: comp.boat,
			// 			skipper: comp.helmname,
			// 			fleet: comp.fleet,
			// 			club: comp.club,
			// 			division: comp.division,
			// 			rest: comp,
			// 			Publisher: {
			// 				connect: { id: userId }
			// 			}
			// 		}
			// 	})
			// },
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
										boat: comp.boat,
										skipper: comp.helmname,
										fleet: comp.fleet,
										club: comp.club,
										division: comp.division,
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
								// console.log('result: ', result)
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
