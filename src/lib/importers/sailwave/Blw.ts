// import { User } from "firebase/auth";
// import { parse } from 'papaparse'
import { createId } from '@paralleldrive/cuid2'
import { formatDate, formatTime } from '../../components/utils/formatters'

interface IBlw {
	// user: User | null | undefined;
	data: any
	// file: chromeFile
}

interface chromeFile extends File {
	lastModifiedDate?: string
}

export default class Blw {
	// // user: User | null | undefined;
	data: any

	constructor(props: IBlw) {
		// this.user = props.user;
		this.data = props.data
		this.data.cuid = createId()
	}
	// this.fileData = this.data

	async getFileData() {
		this.data.cuid = createId()
		return this.data
	}

	getComps() {
		// let data = await this.getFileData()
		const compData: any = []
		const compBoats = this.data.filter(function (item: any) {
			return item[0] === 'comphigh'
		})
		// var sortedBoats = compBoats.sort();
		compBoats.sort().forEach((compBoat: any) => {
			let competitor = {
				id: '0',
				compId: ''
			}

			// competitor.id = compBoat[2] + '-' + this.data.cuid
			competitor.compId = compBoat[2]
			let compRows = this.data.filter((item: any) => {
				var regex = new RegExp(`^comp`, 'g')
				return item[0].match(regex) && item[2] === compBoat[2]
			})
			compRows.forEach((item: any) => {
				const newName = item[0].replace('comp', '')
				competitor[newName] = item[1]
			})
			compData.push(competitor)
		}) //each compBoats
		const sorted = compData!.sort((a: any, b: any) => {
			return a.boat - b.boat
		})

		return sorted!
	} // getComps

	getResults() {
		// const data = await this.getFileData()
		const resultsArr: any = []
		// use rdisc to get an individuals result
		const results = this.data.filter((item: any) => {
			return item[0] === 'rdisc'
		})
		results.forEach((result: any) => {
			// Results in blw file have no prefix to speak of (just an r)
			// So we need to find each row individually
			const resultRow = {
				// id: `${result[3]}-${result[2]}-${this.data.cuid}`,
				resultId: `${result[3]}-${result[2]}`,
				compId: result[2] + '-' + this.data.cuid,
				raceId: result[3] + '-' + this.data.cuid,
				// date: date,
				finish: this.resultHelp('rft', this.data, result)
					? this.resultHelp('rft', this.data, result)
					: '',
				start: this.resultHelp('rst', this.data, result)
					? this.resultHelp('rst', this.data, result)
					: '',
				points: this.resultHelp('rpts', this.data, result)
					? this.resultHelp('rpts', this.data, result)
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

	resultHelp(resultTag: string, data: any[], result: any[]) {
		let res = data.filter((item) => {
			return item[0] === resultTag && item[2] === result[2] && item[3] === result[3]
		})
		if (res[0]) {
			return res[0][1]
		} else {
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
		// const data = await this.getFileData()

		// new object to be returned
		let raceData: any = []
		// Find all raceids by getting known csv row
		const races = this.data.filter((item: any) => {
			return item[0] === 'racerank'
		})
		// For each race push data to new object
		races.forEach((race: any) => {
			let raceObj = {
				id: '',
				index: '',
				raceId: '',
				starts: '',
				name: '',
				rank: ''
			}
			// raceObj.id = race[3] + '-' + this.data.cuid
			raceObj.raceId = race[3]
			let resultRows = this.data.filter((item: any) => {
				var regex = new RegExp(`^race`, 'g')
				return item[0].match(regex) && item[3] === race[3]
			})

			let raceStarts: any = []

			resultRows.forEach((item, idx) => {
				// Format the starts to object
				if (item[0] === 'racestart') {
					const stringToSplit = item[1].split('|')

					let start = stringToSplit[1]

					let fleet = stringToSplit[0].split('^')[1]

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
					const newName = item[0].replace('race', '')

					raceObj[newName] = item[1]
				}
				raceObj.index = '' + idx
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

		return raceData!
	} // getRaces

	getEvent() {
		// const data = await this.getFileData()
		// add file info
		const eventRows = this.data.filter((item: string[]) => {
			const regex = new RegExp(`^ser`, 'g')
			return item[0].match(regex)
		})

		// would be a long interface or type so just allow everything
		// maybe in the future we wont need everything from sailwave
		type EventObj = {
			event: string
			venue?: string
			eventwebsite?: string
			eventeid?: string
			__owner?: string
			__public?: boolean
			seriesId?: string
			lastModifiedDate?: string
			includecorrected?: string

			resultType?: string
			[x: string | number | symbol]: unknown
		}

		// let eventObj = { event: '', eventeid: '', cuid: this.data.cuid }
		let eventObj

		eventRows.forEach((item: string[]) => {
			const newName = item[0].replace('ser', '')
			eventObj[newName] = item[1]
		})

		// make an object for fileInfo to organize better
		// const fileInfo = this.file
		// const _fileInfo = {} as any
		// _fileInfo.name = this.file.name
		// _fileInfo.lastModified = this.file.lastModified
		// _fileInfo.lastModifiedDate = this.file.lastModifiedDate
		// _fileInfo.size = this.file.size
		// const returnObj = { ...seriesObj, _fileInfo }
		const returnObj = { ...eventObj }

		// return series object and fileinfo
		return returnObj
	} // getSeries

	// Don't know if this works currently
	// These functions should be in an export class
	downloadURL(url: any, name: any) {
		const link = document.createElement('a')
		link.download = name
		link.href = url
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
		// delete link;
	}

	// Don't know if this works currently
	downloadFile() {
		const data = localStorage.getItem('savedFile')
		const blob = new Blob([data!], { type: 'text/txt' })
		const url = window.URL.createObjectURL(blob)
		const using = JSON.parse(localStorage.getItem('using')!)
		// LL(using)
		this.downloadURL(url, using.name)
	}
}
