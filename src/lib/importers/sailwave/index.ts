import { prisma } from '$lib/server/prisma'
import { error, fail } from '@sveltejs/kit'
import Blw from './Blw'

export const Populate = async ({ data, userId, file }) => {
	// no file so exit
	if (!data) throw error(400, { message: 'Populate function requires data' })

	// Make new Blw class
	const blw = new Blw({ data })

	// // need to check the series first
	// const eventData = await blw.getEvent()

	// // add owner to series data
	// eventData.__owner = userId

	// // make series public by default
	// let __public = true
	// // will need to necessary changes to import and seriesEdit to control from ui
	// eventData.__public = __public

	// // add blank event
	// eventData.__event = ''

	// if (eventData.includecorrected === '1') {
	// 	eventData.resultType = 'corrected'
	// }

	// const { user, event, venue, venueemail, eventwebsite, eventeid, ...rest } = eventData
	// const { name, lastModified } = file

	// // Find dupicates
	// // maybe a comination of filename and sailwave eventeid then verify lastModified matches
	// // either of these can't be trusted. There can easily be duplicates

	// const eventCreate = await prisma.event.create({
	// 	data: {
	// 		fileInfo: { name, lastModified },
	// 		userId: userId,
	// 		name: event,
	// 		venueName: venue,
	// 		eventwebsite: eventwebsite,
	// 		eventeid: eventeid as string, // ???
	// 		rest: { ...rest } as {}
	// 		// venue: {
	// 		// 	connectOrCreate: {
	// 		// 		where: { name: venue ? venue : 'Unknown venue' },
	// 		// 		create: { name: venue as string, email: venueemail as string }
	// 		// 	}
	// 		// }
	// 	}
	// })

	// const eventId = eventCreate.id
	function test() {
		// This could take in a cuid
		// the cuid could be mapped to connect statements
		// eg:
		//	comp: {
		// 		create: {...},
		// 		event: {
		// 			connect: {cuid: cuid}
		// 	}

		// ////////////////////////////////////////////////////////////////////////////////////////////////////
		// need to set up some kind of sandbox for this so i dont have to go through auth everytime
		// maybe a seed file to get me logged in
		// Regardless Blw is going to have to sanitize the data before this step
		// Crux is that the object here needs to be perfect!!!! again santize in Blw
		///////////////////////////////////////////////////////////////////////////////////////////
		return {
			data: {
				event: {
					create: blw.getEvent(),
					race: {
						create: blw.getRaces(),
						result: {
							create: blw.getResults()
						},
						comp: {
							create: blw.getComps()
						}
					}
				}
			}
		}
	}

	addTables()

	async function addTables() {
		const stuff = test()
		try {
			// await prisma.event.create(stuff)
		} catch (error) {}
	}

	// const added = addTables()

	// async function addTables() {
	// 	// need to be recursive to be sure to add relationships as needed
	// 	await writeComps()
	// 	await writeRaces()
	// 	await writeResults()

	// 	async function writeRaces() {
	// 		const racesData = await blw.getRaces()
	// 		await racesData.forEach(async (race: any) => {
	// 			// console.log('race: ', race)
	// 			const { id, raceId, name, rank, sailed, starts, date, time, notes, ...rest } = await race
	// 			console.log('writeRaces.raceId: ', id)
	// 			try {
	// 				await prisma.race.create({
	// 					data: {
	// 						id: id,
	// 						raceId: raceId,
	// 						eventId: eventId,
	// 						name: name,
	// 						rank: rank,
	// 						sailed: sailed,
	// 						date: date,
	// 						time: time,
	// 						notes: notes,
	// 						rest: { ...rest },
	// 						starts: starts
	// 					}
	// 				})
	// 			} catch (err) {
	// 				console.log('err: ', err)
	// 				return fail(400, { message: 'racesData failed' })
	// 			}
	// 			// console.log('raceRow: ', raceRow)
	// 		})
	// 	}

	// 	async function writeComps() {
	// 		const compsData = await blw.getComps()
	// 		await compsData.forEach(async (comp: any) => {
	// 			const { id, boat, fleet, club, helmname, ...rest } = await comp

	// 			try {
	// 				return await prisma.comp.create({
	// 					data: {
	// 						id: id,
	// 						compId: comp.compId,
	// 						eventId: eventId,
	// 						boat: boat,
	// 						skipper: helmname,
	// 						fleet: fleet,
	// 						club: club,
	// 						rest: rest
	// 					}
	// 				})
	// 			} catch (err) {
	// 				console.log('err: ', err)
	// 				return fail(400, { message: 'compsData failed' })
	// 			}
	// 		})
	// 	}

	// 	async function writeResults() {
	// 		const resultsData = await blw.getResults()
	// 		await resultsData.forEach(async (result: any) => {
	// 			// console.log('result: ', result)
	// 			console.log('writeResults.raceId: ', result.raceId)
	// 			try {
	// 				// console.log('result: ', result)
	// 				await prisma.result.create({
	// 					data: {
	// 						resultId: result.resultId,
	// 						eventId: eventId,
	// 						compId: result.compId,
	// 						raceId: result.raceId,
	// 						finish: result.finish,
	// 						start: result.start,
	// 						points: result.points,
	// 						position: result.position,
	// 						discard: result.discard,
	// 						corrected: result.corrected,
	// 						rrestyp: result.rrestyp,
	// 						elasped: result.elasped,
	// 						srat: result.srat,
	// 						rewin: result.rewin,
	// 						rrwin: result.rrwin,
	// 						rrset: result.rrset
	// 						// ********************
	// 						// rest included id
	// 						// rest: result.rest
	// 					}
	// 				})
	// 			} catch (err) {
	// 				console.log('err: ', err)
	// 			}
	// 		})
	// 	}
	// }
} // populate
