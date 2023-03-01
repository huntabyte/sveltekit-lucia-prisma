// import { User } from "firebase/auth";
// import { parse } from 'papaparse'
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
	}

	async getFileData() {
		// const d = await this.csv
		///////////////////////////////////////////
		// no good need to parse for every request
		return this.data
	}

	// async getFileData() {
	// 	const texted = await this.file.text()
	// 	let d = {}
	// 	const parsed = parse(texted, {
	// 		complete: (results) => {
	// 			d = results.data
	// 		},
	// 		error: (status, err) => {
	// 			// TODO
	// 			return { error: err }
	// 		}
	// 	})
	// 	return d
	// }

	// papaPromise(file: any): Promise<string[]> | Error {
	// 	return new Promise((resolve, reject) => {
	// 		parse(file, {
	// 			complete(results: any) {
	// 				resolve(results.data as string[])
	// 			},
	// 			error(err: Error) {
	// 				reject(err)
	// 			}
	// 		})
	// 	})
	// }

	// papaPromise(file: any): Promise<string[]> | Error {
	// 	return new Promise((resolve, reject) => {
	// 		parse(file.NODE_STREAM_INPUT, {
	// 			complete(results: any) {
	// 				resolve(results.data as string[])
	// 			}
	// 			// error(err: Error) {
	// 			// 	reject(err)
	// 			// }
	// 		})
	// 	})
	// }

	// const papa = require("papaparse");
	// const request = require("request");

	// const options = {/* options */};

	// const dataStream = request.get("https://example.com/myfile.csv");
	// const parseStream = papa.parse(papa.NODE_STREAM_INPUT, options);

	// dataStream.pipe(parseStream);

	// let data = [];
	// parseStream.on("data", chunk => {
	//     data.push(chunk);
	// });

	// parseStream.on("finish", () => {
	//     console.log(data);
	//     console.log(data.length);
	// });

	async getComps() {
		let data = await this.getFileData()
		var compData: any = []
		var compBoats = data.filter(function (item: any) {
			return item[0] === 'comphigh'
		})
		// var sortedBoats = compBoats.sort();
		compBoats.sort().forEach((compBoat: any) => {
			interface CompetitorObj {
				id: number
				compId: string
				[x: string | number | symbol]: unknown
			}

			let competitor: CompetitorObj = {
				id: 0,
				compId: ''
			}

			competitor.id = parseInt(compBoat[2])
			competitor.compId = compBoat[2]
			let compRows = data.filter((item: any) => {
				var regex = new RegExp(`^comp`, 'g')
				return item[0].match(regex) && item[2] === compBoat[2]
			})
			compRows.forEach((item: any) => {
				const newName = item[0].replace('comp', '')
				competitor[newName] = item[1]
			})
			compData.push(competitor)
		}) //each compBoats
		var sorted = compData!.sort((a: any, b: any) => {
			return a.boat - b.boat
		})
		//console.log(compData)
		return sorted!
	} // getComps

	async getResults() {
		const data = await this.getFileData()

		const resultsArr: any = []
		// use rdisc to get an individuals result
		const results = data.filter((item: any) => {
			return item[0] === 'rdisc'
		})
		results.forEach((result: any) => {
			// Results in blw file have no prefix to speak of (just an r)
			// So we need to find each row individually

			// I would like to see a differrent solution for undefined
			// we cannot pass undefined to firestore

			// const raceDates = data.filter((item) => {
			//   return item[0] === "racedate";
			// });
			// // console.log('raceDates: ', raceDates);

			// const raceDate = raceDates.filter((item) => {
			//   return item[3] === result[3];
			// });

			// let date;
			// if (raceDate[0] && raceDate[0][1]) {
			//   date = formatDate(raceDate[0][1]);
			// } else {
			//   date = "";
			// }
			// // const date = formatDate(dateString)

			const resultRow = {
				id: `${result[3]}-${result[2]}`,
				compId: result[2],
				raceid: result[3],
				// date: date,
				finish: this.resultHelp('rft', data, result) ? this.resultHelp('rft', data, result) : '',
				start: this.resultHelp('rst', data, result) ? this.resultHelp('rst', data, result) : '',
				points: this.resultHelp('rpts', data, result) ? this.resultHelp('rpts', data, result) : '',
				position: this.resultHelp('rpos', data, result)
					? this.resultHelp('rpos', data, result)
					: '',
				discard: this.resultHelp('rdisc', data, result)
					? this.resultHelp('rdisc', data, result)
					: '',
				corrected: this.resultHelp('rcor', data, result)
					? this.resultHelp('rcor', data, result)
					: '',
				rrestyp: this.resultHelp('rrestyp', data, result)
					? this.resultHelp('rrestyp', data, result)
					: '',
				elapsed: this.resultHelp('rele', data, result) ? this.resultHelp('rele', data, result) : '',
				srat: this.resultHelp('srat', data, result) ? this.resultHelp('srat', data, result) : '',
				rewin: this.resultHelp('rewin', data, result) ? this.resultHelp('rewin', data, result) : '',
				rrwin: this.resultHelp('rrwin', data, result) ? this.resultHelp('rrwin', data, result) : '',
				rrset: this.resultHelp('rrset', data, result) ? this.resultHelp('rrset', data, result) : ''
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
	async getFleets() {
		const data = await this.getFileData()
		var fleetsRaw: any[] = data.filter((item: any) => {
			return item[0] === 'serpubgroupvalues'
		})
		var fleets = fleetsRaw[0][1].match(/[^|]+/g)

		return fleets
	}

	async getRaces() {
		const data = await this.getFileData()

		// new object to be returned
		let raceData: any = []
		// Find all raceids by getting known csv row
		const races = data.filter((item: any) => {
			return item[0] === 'racerank'
		})
		// For each race push data to new object
		races.forEach((race: any) => {
			let raceObj = {
				index: '',
				raceid: '',
				starts: '',
				name: '',
				rank: ''
			}
			raceObj.raceid = race[3]
			let resultRows = data.filter((item: any) => {
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
				// if(!item)
			}) // resultRows.forEach

			// now add the starts to raceObj
			raceStarts.forEach((start: any) => {
				raceObj.starts = raceStarts
			})

			if (!raceObj.name) {
				raceObj.name = `Race ${raceObj.rank}`
			}
			raceData.push(raceObj)
			// console.log("raceData: ", raceData);
		})

		return raceData!
	} // getRaces

	async getSeries() {
		const data = await this.getFileData()
		// console.log('data: ', data)
		// add file info
		const seriesRows = data.filter((item: any) => {
			const regex = new RegExp(`^ser`, 'g')
			return item[0].match(regex)
		})

		// would be a long interface or type so just allow everything
		// maybe in the future we wont need everything from sailwave
		type SeriesObj = {
			event: string
			__owner?: string
			__event?: string
			__public?: boolean
			lastModifiedDate?: string
			includecorrected?: string
			resultType?: string
			[x: string | number | symbol]: unknown
		}

		let seriesObj: SeriesObj = { event: '' }

		seriesRows.forEach((item: any) => {
			const newName = item[0].replace('ser', '')
			seriesObj[newName] = item[1]
		})

		// make an object for fileInfo to organize better
		// const fileInfo = this.file
		// const _fileInfo = {} as any
		// _fileInfo.name = this.file.name
		// _fileInfo.lastModified = this.file.lastModified
		// _fileInfo.lastModifiedDate = this.file.lastModifiedDate
		// _fileInfo.size = this.file.size
		// const returnObj = { ...seriesObj, _fileInfo }
		const returnObj = { ...seriesObj }

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
