// import {RelativeTimeFormatUnit} from '../typedefs/lib.es2020.intl'

const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
	currency: 'USD',
	style: 'currency'
})
export function formatCurrency(number) {
	return CURRENCY_FORMATTER.format(number)
}

const NUMBER_FORMATTER = new Intl.NumberFormat(undefined)
export function formatNumber(number) {
	return NUMBER_FORMATTER.format(number)
}

const COMPACT_NUMBER_FORMATTER = new Intl.NumberFormat(undefined, {
	notation: 'compact'
})
export function formatCompactNumber(number) {
	return COMPACT_NUMBER_FORMATTER.format(number)
}

const DIVISIONS = [
	{ amount: 60, name: 'seconds' as any },
	{ amount: 60, name: 'minutes' },
	{ amount: 24, name: 'hours' },
	{ amount: 7, name: 'days' },
	{ amount: 4.34524, name: 'weeks' },
	{ amount: 12, name: 'months' },
	{ amount: Number.POSITIVE_INFINITY, name: 'years' }
]

const RELATIVE_DATE_FORMATTER = new Intl.RelativeTimeFormat(undefined, {
	numeric: 'auto'
})

export function formatRelativeDate(toDate, fromDate: any = new Date()) {
	let duration = (toDate - fromDate) / 1000

	for (let i = 0; i <= DIVISIONS.length; i++) {
		const division = DIVISIONS[i]
		if (Math.abs(duration) < division.amount) {
			return RELATIVE_DATE_FORMATTER.format(Math.round(duration), division.name)
		}
		duration /= division.amount
	}
}

// function isValidDate(d) {
//   return d instanceof Date && !isNaN(d);
// }
export const formatDateTime = (date: Date) => {
	try {
		return new Intl.DateTimeFormat(undefined, {
			dateStyle: 'short',
			timeStyle: 'short'
		}).format(date)
	} catch (error) {
		console.error('error: ', error)
	}
}

export const formatDate = (date: string) => {
	// this Obviously has holes in its theroy
	// I hate dates and i would encourage people to update there sailwave files or
	// just as the scorer just input the date at this stage
	// const date = new Date(dateString)
	if (date) {
		// all this can be solved with this line

		// console.log(new Intl.DateTimeFormat('en-CA').format(date));

		if (date.toString().includes('/')) {
			const rearrange = date.toString().split('/')
			// When i try to not mutate i get undefined randomly

			// Add "20" to 2 digit years
			if (rearrange[2].length === 2) {
				// console.log("rearrange[2]: ", rearrange[2]);
				rearrange[2] = `20${rearrange[2]}`
			}
			// Add missing zero to month and day
			if (rearrange[1].length < 2) {
				rearrange[1] = `0${rearrange[1]}`
			}
			if (rearrange[0].length < 2) {
				rearrange[0] = `0${rearrange[0]}`
			}

			const sorted = `${rearrange[2]}-${rearrange[1]}-${rearrange[0]}`
			// console.log("sorted: ", sorted);
			return sorted
		}
		// else {
		//   return date;
		// }
		return date
	}
	return ''
}
//

export const formatTime = (s: string): string => {
	// check for letters in string
	// This throws a warning
	const regex = /[A-Z]/g
	if (s.match(regex)) {
		console.warn('Not a time: ', s)
		return ''
	}
	// guard's
	if (s.includes('-')) {
		// console.log("replace -  ", s);
		const r = s.replace('-', ':')
		const t = r.replace('-', ':')
		return t
	}
	// if colon all good
	if (s.includes(':')) {
		return s
	}
	// sample data sometimes uses dots
	if (s.includes('.')) {
		s.replace('.', ':')
		return s
	}
	//  four character strings are in the sample data
	// ie: 1100
	if (s.length === 4) {
		const str = s.split('')
		const time = `${str[0]}${str[1]}:${str[2]}${str[3]}:00`
		return time
	}

	return ''
}

const makeTimestamp = () => {
	// i wanna return a time stamp from input string
}

export const capitalizeFirstLetter = (string: string) => {
	return string.charAt(0).toUpperCase() + string.slice(1)
}
