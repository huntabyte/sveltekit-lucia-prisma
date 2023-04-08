// import { User } from "firebase/auth";
// import { parse } from 'papaparse'
import { createId } from '@paralleldrive/cuid2'
import { formatDate, formatTime } from '../../utils/formatters'

interface IBlw {
	// user: User | null | undefined;
	data: any
	file: any
	// file: chromeFile
}

interface chromeFile extends File {
	lastModifiedDate?: string
}

export default class Blw {
	// // user: User | null | undefined;
	data: any
	file: any

	constructor(props: IBlw) {
		// this.user = props.user;
		this.data = props.data
		this.file = props.file
		this.data.cuid = createId()
	}

	getComps() {
		const compData: any = []
		const compBoats = this.data.filter((item: any) => {
			return item[0] === 'comphigh'
		})
		compBoats.sort().forEach((compBoat: any) => {
			let competitor = {
				compId: ''
			}

			competitor.compId = `${compBoat[2]}-${this.data.cuid}`
			let compRows = this.data.filter((item: any) => {
				var regex = new RegExp(`^comp`, 'g')
				return item[0].match(regex) && item[2] === compBoat[2]
			})
			compRows.forEach((item: any) => {
				const newName = item[0].replace('comp', '')
				competitor[newName] = item[1] ?? ''
			})
			compData.push(competitor)
		}) //each compBoats
		// const sorted = compData!.sort((a: any, b: any) => {
		// 	return a.boat - b.boat
		// })

		return compData
	} // getComps

	getResults(raceId) {
		// const data = await this.getFileData()
		const resultsArr: any = []
		// use rdisc to get an individuals result
		const results = this.data.filter((item: any) => {
			return item[0] === 'rdisc' && item[3] === raceId
		})
		// console.log('results: ', results)
		results.forEach((result: any) => {
			// console.log('result: ', result)
			// Results in blw file have no prefix to speak of (just an r)
			// So we need to find each row individually
			const resultRow = {
				resultId: `${result[3]}-${result[2]}-${this.data.cuid}`,
				compId: `${result[2]}-${this.data.cuid}`,
				finish: this.resultHelp('rft', this.data, result)
					? this.resultHelp('rft', this.data, result)
					: '',
				start: this.resultHelp('rst', this.data, result)
					? this.resultHelp('rst', this.data, result)
					: '',
				points: this.resultHelp('rpts', this.data, result)
					? this.resultHelp('rpts', this.data, +result)
					: '',
				position: this.resultHelp('rpos', this.data, result)
					? this.resultHelp('rpos', this.data, result)
					: '',
				discard: this.resultHelp('rdisc', this.data, result)
					? this.resultHelp('rdisc', this.data, result)
					: '',
				corrected: this.resultHelp('rcor', this.data, result)
					? this.resultHelp('rcor', this.data, result)
					: '',
				rrestyp: this.resultHelp('rrestyp', this.data, result)
					? this.resultHelp('rrestyp', this.data, result)
					: '',
				elapsed: this.resultHelp('rele', this.data, result)
					? this.resultHelp('rele', this.data, result)
					: '',
				srat: this.resultHelp('srat', this.data, result)
					? this.resultHelp('srat', this.data, result)
					: '',
				rewin: this.resultHelp('rewin', this.data, result)
					? this.resultHelp('rewin', this.data, result)
					: '',
				rrwin: this.resultHelp('rrwin', this.data, result)
					? this.resultHelp('rrwin', this.data, result)
					: '',
				rrset: this.resultHelp('rrset', this.data, result)
					? this.resultHelp('rrset', this.data, result)
					: ''
			}
			resultsArr.push(resultRow)
		}) // forEach

		return resultsArr
	} // getResults

	resultHelp(resultTag: string, data: any[], result: any[] | number) {
		let res = data.filter((item) => {
			return item[0] === resultTag && item[2] === result[2] && item[3] === result[3]
		})
		// console.log('res: ', res)
		if (res[0]) {
			return res[0][1]
		} else {
			// console.log('else res: ', res)
			return ''
		}
	}

	// I don't think i use this
	// each race has fleets
	getFleets() {
		// const data = await this.getFileData()
		var fleetsRaw: any[] = this.data.filter((item: any) => {
			return item[0] === 'serpubgroupvalues'
		})
		var fleets = fleetsRaw[0][1].match(/[^|]+/g)

		return fleets
	}

	getRaces() {
		// new object to be returned
		let raceData: any = []
		// Find all raceids by getting known csv row
		const races = this.data.filter((item: any) => {
			return item[0] === 'racerank'
		})
		// For each race push data to new object
		races.forEach((race: any) => {
			let raceObj = {
				raceId: '',
				starts: '',
				name: '',
				rank: ''
			}

			raceObj.raceId = race[3]

			let resultRows = this.data.filter((item: any) => {
				var regex = new RegExp(`^race`, 'g')
				return item[0].match(regex) && item[3] === race[3]
			})

			let raceStarts: any = []

			resultRows.forEach((item) => {
				// Format the starts to object
				if (item[0] === 'racestart') {
					const racestartString = item[1].split('|')
					let start = racestartString[1]
					let fleet = racestartString[0].split('^')[1]

					// remove the undefined
					if (!fleet) fleet = 'none'

					// This will stop undefined or null
					try {
						start = formatTime(start)
					} catch {
						start = ''
					}

					raceStarts.push({ fleet, start })
				} else {
					// not racestart so just add to raceObj
					const property = item[0].replace('race', '')
					raceObj[property] = item[1]
				}
			}) // resultRows.forEach

			// now add the starts to raceObj
			raceStarts.forEach((start: any) => {
				raceObj.starts = raceStarts
			})

			if (!raceObj.name) {
				raceObj.name = `Race ${raceObj.rank}`
			}
			raceData.push(raceObj)
		})

		return raceData
	} // getRaces

	getEvent() {
		const eventRows = this.data.filter((item: any) => {
			const regex = new RegExp(`^ser`, 'g')
			return item[0].match(regex)
		})

		type EventRest = {
			venuewebsite?: string
			venueemail?: string
			venueburgee?: string
			eventburgee?: string
		}

		type EventObj = {
			event: string
			eventwebsite: string
			venue: string
			eventeid: string
			rest: EventRest
		}

		let eventObj: any = {
			event: '',
			eventwebsite: '',
			venue: '',
			eventeid: '',
			rest: {}
		}

		eventRows.forEach((item) => {
			const property = item[0].replace('ser', '')
			eventObj[property] = item[1]
		})

		const { event, eventwebsite, venue, eventeid, ...rest } = eventObj
		const uniqueIdString = event.toLowerCase().trim() + eventeid + venue.toLowerCase().trim()
		return {
			name: event,
			eventwebsite,
			uniqueIdString,
			venueName: venue,
			eventeid: eventeid,
			rest
		}
	} // getSeries
}
