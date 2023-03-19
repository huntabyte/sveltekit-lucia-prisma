<script lang="ts">
	import type { PageData } from './$types'
	import Page from '$lib/components/layout/Page.svelte'
	import ItemCard from '$lib/components/layout/ItemCard.svelte'

	export let data: PageData
	console.log(' data.events: ', data.events)
</script>

<Page title="Your Events">
	{#each data.events as event}
		<ItemCard title={event.name}>
			<div slot="top-right">top right</div>
			<div slot="bottom-right">bottom</div>
			<a
				href={event.eventwebsite && event.eventwebsite.startsWith('http://')
					? event.eventwebsite
					: `http://${event.eventwebsite}`}>{event.eventwebsite}</a
			>
		</ItemCard>
	{/each}
</Page>
