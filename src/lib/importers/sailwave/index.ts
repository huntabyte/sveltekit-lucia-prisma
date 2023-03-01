import { prisma } from '$lib/server/prisma'
import { fail } from '@sveltejs/kit'
import Blw from './Blw'

export const Populate = async ({ data, userId }) => {
	// no file so exit
	if (!data) return

	// Make new Blw class
	const blw = new Blw({ data })

	// need to check the series first
	const seriesData = await blw.getSeries()

	// add owner to series data
	seriesData.__owner = userId

	// make series public by default
	let __public = true
	// will need to necessary changes to import and seriesEdit to control from ui
	seriesData.__public = __public

	// add blank event
	seriesData.__event = ''

	if (seriesData.includecorrected === '1') {
		seriesData.resultType = 'corrected'
	}
	const sId = 'hey'
	const added = addTables(sId)

	// Find dupicates
	// maybe a comination of filename and sailwave series id
	// const copy = prisma.series.findFirst({
	// 	where: { userId: userId }
	// })
	// console.log('copy: ', await copy)
	// console.log('seriesData: ', seriesData)

	// const { event, venue, eventwebsite, eventeid, ...rest } = seriesData
	// const series = prisma.series.create({
	// 	data: {
	// 		userId,
	// 		event,
	// 		venue: venue as string,
	// 		eventwebsite: eventwebsite as string,
	// 		eventeid: eventeid as string,
	// 		...rest
	// 	}
	// })

	// // Find copies and write
	// let sId
	// const findCopyFile = query(
	// 	collectionGroup(db, 'series'),
	// 	where('__fileInfo.name', '==', seriesData.__fileInfo.name)
	// )

	// const copies = await getDocs(findCopyFile)
	// // No copies so write as is
	// if (!copies.empty) {
	// 	copies.forEach(async (copyDoc) => {
	// 		if (copy) {
	// 			const existingFileName = seriesData.__fileInfo.name
	// 			const fileNameParts = existingFileName.split('.')
	// 			seriesData.__fileInfo.name = `${fileNameParts[0]}-of-${copyDoc.id}.${fileNameParts[1]}`
	// 			seriesData.event = `${seriesData.event}-copy`
	// 			sId = await addDoc(seriesRef, seriesData)
	// 			await addTables(sId)
	// 		} else {
	// 			sId = await updateDoc(doc(seriesRef, copyDoc.id), seriesData)
	// 			await addTables(sId || null)
	// 		}
	// 	})
	// } else {
	// 	sId = await addDoc(seriesRef, seriesData)
	// 	await addTables(sId)
	// }

	async function addTables(sId) {
		// i wanna make comps top level but put race specific shit on the race
		const compsData = await blw.getComps()

		// races are races
		const racesData = await blw.getRaces()

		//results are results
		const resultsData = await blw.getResults()

		// Map comps to db
		await compsData.forEach(async (comp: any, idx) => {
			// need to add each comp to competitor table
			// include seriesId and _uid
			// console.log('comp: ', idx, comp.boat)
			try {
				await prisma.comp.create({
					data: {
						compId: comp.compId,
						seriesId: sId,
						boat: comp.boat,
						fleet: comp.fleet,
						club: comp.club,
						total: comp.total,
						nett: comp.nett,
						rank: comp.rank,
						exclude: comp.exclude,
						alias: comp.alias,
						rating: comp.rating,
						helmname: comp.helmname,
						high: comp.high
					}
				})
			} catch (err) {
				return fail(400, { message: 'compsData failed' })
			}
		})

		// Map race to firestore
		await racesData.forEach((race: any) => {
			// console.log('race: ', race)
			// setDoc(doc(seriesRef, sId.id, 'races', race.raceid), {
			// 	_seriesid: sId.id,
			// 	...race
			// })
		})

		// Map results to firestore
		await resultsData.forEach((result: any) => {
			// console.log('result: ', result)
			// setDoc(doc(seriesRef, sId.id, 'results', result.id), {
			// 	_seriesid: sId.id,
			// 	...result
			// })
		})
	}
} // populate
