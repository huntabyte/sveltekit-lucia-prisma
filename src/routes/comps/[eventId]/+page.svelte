<script lang="ts">
	import ItemCard from '$lib/components/layout/ItemCard.svelte'
	import Page from '$lib/components/layout/Page.svelte'
	import { formatDateTime } from '$lib/utils/formatters'
	import Icon from '@iconify/svelte'
	import type { PageData } from './$types'

	export let data: PageData
	$: ({ user, comps } = data)
	// console.log('comps: ', comps?.rest );
</script>

<Page title="Competitiors">
	{#if comps}
		{#each comps as comp}
			<ItemCard title={comp.boat ? comp.boat : comp.skipper} href="/comps/comp/{comp.id}">
				<div slot="top-right">
					<a href="/races/{comp.id}" class="btn btn-accent btn-xs">View Races</a>
				</div>
				<div slot="bottom-right" class="flex justify-end text-primary">
					<div class="tooltip tooltip-top" data-tip="View Competitors">
						<a href="/comps/{comp?.id}" class="btn btn-ghost p-1">
							<Icon icon="material-symbols:groups-outline-rounded" width="30" />
						</a>
					</div>
					<!-- Edit should only show when current user is owner -->
					<div class="tooltip tooltip-top" data-tip="Race Edit">
						<a href="/event/{comp?.id}" class="btn btn-ghost">
							<Icon icon="material-symbols:edit-outline" width="24" />
						</a>
					</div>
				</div>
				<div class="flex flex-col">
					<div>
						{comp.skipper ? `Skipper: ${comp.skipper}` : ''}
					</div>
					<div>
						{comp.club ? `Club: ${comp.club}` : ''}
					</div>
					<div>
						{comp.fleet ? `Fleet: ${comp.fleet}` : ''}
					</div>
					<div>
						{comp.division ? `Division: ${comp.division}` : ''}
					</div>
					<div>
						{comp.rest?.rating ? `Rating: ${comp.rest?.rating}` : ''}
					</div>
					<div>
						{comp.division ? `Division: ${comp.division}` : ''}
					</div>
					<div>
						{comp.division ? `Division: ${comp.division}` : ''}
					</div>
				</div>

				<div slot="bottom-left" class="p-2 text-xs text-base-content">
					<div>
						Updated:
						<span class="px-2">
							{#if comp.updatedAt}
								{formatDateTime(comp.updatedAt)}
							{:else}
								No date provided
							{/if}
						</span>
					</div>
					<div>
						Created:
						<span class="px-2">
							{#if comp.createdAt}
								{formatDateTime(comp.createdAt)}
							{:else}
								No time provided
							{/if}
						</span>
					</div>
				</div>
			</ItemCard>
		{/each}
	{:else}
		<div>Loading...</div>
	{/if}
</Page>
