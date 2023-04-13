<script lang="ts">
	import { writable } from 'svelte/store'
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
	import AscSort from './ascSort.svelte'
	import DscSort from './dscSort.svelte'
	import Empty from './empty.svelte'
	import Centered from './centered.svelte'

	// export let data
	// export let fleetData
	export let race
	export let results
	export let fleetName
	// console.log('results: ', results)
	const notypecheck = (x: any) => x

	let columnVisibility = { fleet: false }

	let resultRows = results.map((result) => {
		// you cannot pass null on anything here

		return {
			points: result.points, // convert to number
			position: result.position,
			rank: result.Comp?.rank ?? '',
			total: result.Comp?.total ?? '',
			nett: result.Comp?.nett ?? '',
			finish: result.finish,
			elapsed: result.elasped,
			start: result.start,
			corrected: result.corrected,
			fleet: result.Comp?.fleet ?? result.Comp?.division,
			boat: result.Comp?.boat,
			skipper: result.Comp?.skipper ?? 'No skipper'
		}
	})

	type Result = {
		points?: string
		rank?: string
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
			header: `${fleetName}`,
			columns: [
				{
					accessorKey: 'rank',
					header: 'Rank',
					cell: (info) => info.getValue()
				},
				{
					accessorKey: 'points',
					header: 'Points',
					cell: (info) => flexRender(Centered, { info: info.getValue() })
				},
				{
					accessorKey: 'position',
					header: 'Place',
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
				// {
				// 	accessorKey: 'fleet',
				// 	header: 'Fleet',
				// 	cell: (info) => info.getValue()
				// },
				{
					accessorKey: 'corrected',
					header: 'Corrected',
					cell: (info) => (info.getValue() as number).toString()
				},
				{
					accessorKey: 'nett',
					header: 'Nett',
					cell: (info) => info.getValue()
				},
				{
					accessorKey: 'total',
					header: 'Total',
					cell: (info) => info.getValue()
				}
			]
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
		onColumnVisibilityChange: setColumnVisibility
		// debugTable: true
	})

	function setColumnVisibility(updater) {
		if (updater instanceof Function) {
			columnVisibility = updater(columnVisibility)
		} else {
			columnVisibility = updater
		}

		options.update((old) => ({
			...old,
			state: {
				...old.state,
				columnVisibility
			}
		}))
	}

	function getResultColumns() {
		// this is to set default column visibilty from database
		if (race?.Event?.resultColumns) {
			// set event presets
			setColumnVisibility(race?.Event?.resultColumns)
		}
		if (race?.resultColumns) {
			// overide with eace presets
			setColumnVisibility(race?.Event?.resultColumns)
		}
		return columnVisibility
	}

	$: columnVisibility = getResultColumns()

	const table = createSvelteTable(options)
</script>

<div class="my-8">
	<div class="flex justify-between mb-4">
		<h2>{fleetName}</h2>
		<label for="my-modal-3" class="btn btn-active">view</label>

		<!-- Put this part before </body> tag -->
		<input type="checkbox" id="my-modal-3" class="modal-toggle" />
		<div class="modal">
			<div class="modal-box relative">
				<label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
				<h3 class="text-lg font-bold">Choose View Options</h3>
				{#each $table.getAllLeafColumns() as column}
					<div class="px-1">
						<label class="label">
							<span class="label-text pr-1">{column.id.toLocaleUpperCase()}</span>
							<input
								type="checkbox"
								class="checkbox checkbox-xs"
								checked={column.getIsVisible()}
								on:change={column.getToggleVisibilityHandler()}
							/>
						</label>
					</div>
				{/each}
			</div>
		</div>
	</div>
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
</div>
