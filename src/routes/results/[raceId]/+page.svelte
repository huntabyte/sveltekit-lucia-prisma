<script lang="ts">
	import Page from '$lib/components/layout/Page.svelte'
	import { svelog } from '$lib/utils'
	import type { Comp, Result } from '@prisma/client'
	import type { PageData } from './$types'
	import FleetTable from './FleetTable.svelte'

	export let data: PageData
	// console.log('data: ', data.results)
	$: ({ race, results } = data)

	// make an arrays filtered by a set from fleet

	// first step is turn the unique fleets if any in this race into an array
	function getUniqueFleetsArray() {
		return [
			...new Set(
				data.results?.map((item) => {
					if (item.Comp?.fleet) {
						return item.Comp?.fleet
					}
					return item.Comp?.division
				})
			)
		]
	}

	function getFleetResults(key: string | null | undefined) {
		return data.results?.filter((result) => {
			if (result.Comp?.fleet) {
				return result.Comp?.fleet === key
			} else if (result.Comp?.fleet) {
				return result.Comp?.fleet === key
			}
			// might be a bad override here
			return result
		})
	}

	let tables

	function fleetsTables() {
		let fleetsTables: (Result & {
			Comp: Comp | null
		})[] = []
		const unique = getUniqueFleetsArray()
		// console.log('unique: ', unique)
		unique.forEach((uf) => {
			let fleetResults = getFleetResults(uf)

			if (fleetResults) fleetsTables.push(fleetResults as any)
		})
		// console.log('fleetsTables: ', fleetsTables)
		return fleetsTables
	}

	tables = fleetsTables()
</script>

<Page title={race?.Event?.name}>
	{#each tables as table}
		<FleetTable race={data.race} results={table} fleetName={table[0].Comp?.fleet} />
	{/each}
</Page>
