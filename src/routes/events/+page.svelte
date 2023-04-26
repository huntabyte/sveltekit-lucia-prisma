<script lang="ts">
	import type { PageData } from './$types'
	import { page } from '$app/stores'
	import Page from '$lib/components/layout/Page.svelte'
	import ItemCard from '$lib/components/layout/ItemCard.svelte'
	import Icon from '@iconify/svelte'
	import { formatDateTime } from '$lib/utils/formatters'

	export let data: PageData

	$: ({ events } = data)
</script>

<Page title="Your Events">
	{#each events as event}
		<ItemCard title={event.name} href="/events/{event.id}">
			<div slot="top-right">
				<a href="/races/{event.id}" class="btn btn-accent btn-xs">View Races</a>
			</div>
			<div slot="bottom-right" class="flex justify-end text-primary">
				<div class="tooltip tooltip-top" data-tip="View Competitors">
					<a href="/comps/{event?.id}" class="btn btn-ghost p-1">
						<Icon icon="material-symbols:groups-outline-rounded" width="30" />
					</a>
				</div>
				<!-- Edit should only show when current user is owner -->
				<div class="tooltip tooltip-top" data-tip="Event Edit">
					<a href="/events/edit/{event?.id}?from={$page.url.pathname}" class="btn btn-ghost">
						<Icon icon="material-symbols:edit-outline" width="24" />
					</a>
				</div>
			</div>
			<div>
				{event.description ? event.description : 'No description provided'}
			</div>
			<a
				href={event.eventwebsite && event.eventwebsite.startsWith('http://')
					? event.eventwebsite
					: `http://${event.eventwebsite}`}>{event.eventwebsite}</a
			>
			<div slot="bottom-left" class="p-2 text-xs text-base-content">
				<div>
					Updated:
					<span class="px-2">
						{#if event.updatedAt}
							{formatDateTime(event.updatedAt)}
						{:else}
							No date provided
						{/if}
					</span>
				</div>
				<div>
					Created:
					<span class="px-2">
						{#if event.createdAt}
							{formatDateTime(event.createdAt)}
						{:else}
							No time provided
						{/if}
					</span>
				</div>
			</div>
		</ItemCard>
	{/each}
</Page>
