<script lang="ts">
	import { writable } from 'svelte/store'
	import Page from '$lib/components/layout/Page.svelte'
	import {
		createSvelteTable,
		getCoreRowModel,
		getSortedRowModel,
		type ColumnDef,
		type TableOptions,
		flexRender,
		createColumnHelper,
		type SortDirection
	} from '@tanstack/svelte-table'
	import { makeData, type Person } from './makeData'
	import AscSort from './ascSort.svelte'
	import DscSort from './dscSort.svelte'
	import Empty from './empty.svelte'

	// export let data
	// export let fleetData
	export let race
	export let results

	const notypecheck = (x: any) => x

	let columnVisibility = { corrected: false }
	// $: ({ results, user } = data)
	// console.log('data: ', data.results)
	function getResultColumns() {
		if (race?.Event?.resultColumns) {
			// set event presets
			setColumnVisibility(race?.Event?.resultColumns)
			// this is just setColumn
		}
		if (race?.resultColumns) {
			setColumnVisibility(race?.Event?.resultColumns)
			// viewColumns = data.race?.resultColumns
		}
		return columnVisibility
	}

	// const view = getResultColumns()
	$: columnVisibility = getResultColumns()

	// console.log('view: ', view)

	const resultRows = results?.map((result) => {
		return {
			points: +result.points, // convert to number
			finish: result.finish,
			elapsed: result.elasped,
			start: result.start,
			corrected: result.corrected,
			fleet: result.Comp?.fleet ?? result.Comp?.division,
			boat: result.Comp?.boat,
			skipper: result.Comp?.skipper ?? 'No skipper'
		}
	})

	// console.log('resultRows: ', resultRows)

	type Result = {
		points?: number
		boat?: string
		skipper?: string
		finish?: string
		start?: string
		elapsed?: string
		corrected?: string
		[key: string]: any
	}

	///////////////////////////////////////////////////////
	const columns: ColumnDef<Result>[] = [
		{
			accessorKey: 'points',
			header: 'Points',
			cell: (info) => info.getValue()
		},
		{
			accessorKey: 'position',

			header: 'Position',
			cell: (info) => info.getValue()
		},
		{
			accessorKey: 'boat',
			header: 'Boat',
			cell: (info) => info.getValue()
		},
		{
			accessorKey: 'skipper',
			header: 'Skipper',
			cell: (info) => info.getValue()
		},
		{
			accessorKey: 'fleet',
			header: 'Fleet',
			cell: (info) => info.getValue()
		},
		{
			accessorKey: 'corrected',
			header: 'Corrected',
			cell: (info) => (info.getValue() as number).toString()
		}
	]
	///////////////////////////////////////////////////////

	let sorting = []

	function getSortSymbol(isSorted: boolean | SortDirection) {
		return isSorted ? (isSorted === 'asc' ? AscSort : DscSort) : Empty
	}

	const setSorting = (updater) => {
		if (updater instanceof Function) {
			sorting = updater(sorting)
		} else {
			sorting = updater
		}
		options.update((old) => ({
			...old,
			state: {
				...old.state,
				sorting
			}
		}))
	}

	const options = writable<TableOptions<Result>>({
		data: resultRows,
		columns,
		state: {
			sorting,
			columnVisibility
		},
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		debugTable: true
	})

	function setColumnVisibility(updater) {
		// console.log('updater: ', updater)
		if (updater instanceof Function) {
			columnVisibility = updater(columnVisibility)
		} else {
			columnVisibility = updater
		}
		// console.log('columnVisibility: ', columnVisibility)
		// TODO
		// default visiblity could be set in event
		// and maybe overide per race or user pref.

		options.update((old) => ({
			...old,
			state: {
				...old.state,
				columnVisibility
			}
		}))
	}

	const table = createSvelteTable(options)
</script>

<Page title="Results">
	{#each $table.getAllLeafColumns() as column}
		<div class="px-1">
			<label>
				<input
					checked={column.getIsVisible()}
					on:change={column.getToggleVisibilityHandler()}
					type="checkbox"
				/>{' '}
				{column.id}
			</label>
		</div>
	{/each}
	<table class="table table-zebra w-full mr-10">
		<thead>
			{#each $table.getHeaderGroups() as headerGroup}
				<tr>
					{#each headerGroup.headers as header}
						<th colSpan={header.colSpan}>
							{#if !header.isPlaceholder}
								<div
									class:cursor-pointer={header.column.getCanSort()}
									class:select-none={header.column.getCanSort()}
									class="flex"
									on:click={header.column.getToggleSortingHandler()}
									on:keyup
								>
									<svelte:component
										this={notypecheck(
											flexRender(header.column.columnDef.header, header.getContext())
										)}
									/>
									<span class="pl-1">
										<svelte:component this={getSortSymbol(header.column.getIsSorted())} />
									</span>
								</div>
							{/if}
						</th>
					{/each}
				</tr>
			{/each}
		</thead>
		<tbody>
			{#each $table.getRowModel().rows.slice(0, 10) as row}
				<tr>
					{#each row.getVisibleCells() as cell}
						<td>
							<svelte:component
								this={notypecheck(flexRender(cell.column.columnDef.cell, cell.getContext()))}
							/>
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
		<tfoot>
			{#each $table.getFooterGroups() as footerGroup}
				<tr>
					{#each footerGroup.headers as header}
						<th colSpan={header.colSpan}>
							{#if !header.isPlaceholder}
								<svelte:component
									this={notypecheck(
										flexRender(header.column.columnDef.footer, header.getContext())
									)}
								/>
							{/if}
						</th>
					{/each}
				</tr>
			{/each}
		</tfoot>
	</table>
</Page>
