<script script lang="ts">
	import type { Event } from '@prisma/client'
	import type { PageData } from './$types'
	import Page from '$lib/components/layout/Page.svelte'
	import ItemCard from '$lib/components/layout/ItemCard.svelte'
	import Icon from '@iconify/svelte'
	import { page } from '$app/stores'

	export let data: PageData
	$: ({ event } = data)
	console.log('event: ', event)
	//
	const getHref = (event: Event | undefined) => {
		return event?.eventwebsite && event.eventwebsite.startsWith('http://')
			? event.eventwebsite
			: `http://${event?.eventwebsite}`
	}
</script>

{#if data}
	<Page title={event?.name} className="mt-8">
		<div class="max-w-md mx-auto bg-base-100 rounded-xl shadow-md overflow-hidden md:max-w-2xl">
			<div class="md:flex">
				<div class="md:shrink-0">
					<img
						class="h-48 w-full object-cover md:h-full md:w-48 rounded-br-full"
						src={event?.titleImage ? event?.titleImage : 'https://picsum.photos/id/384/400/300/'}
						alt="Title for {event?.name}"
					/>
				</div>
				<div class="pt-8 pb-4 px-8">
					<div class="uppercase tracking-wide text-sm text-accent font-semibold">
						{@html event?.name}
					</div>
					<a
						href={getHref(event)}
						class="block mt-1 text-lg leading-tight font-medium text-base-content hover:underline"
					>
						{event?.venueName}
					</a>
					<p class="mt-2 text-base-content">
						{event?.description ? event?.description : 'No description provided'}
					</p>
					<a href={getHref(event)} class="text-secondary">{event?.eventwebsite} </a>
				</div>
			</div>
			<div class="px-4 pb-4  flex justify-end">
				<div class="tooltip tooltip-top" data-tip="View Competitors">
					<a href="/comps/{event?.id}" class="btn btn-ghost p-1">
						<Icon class="text-3xl text-primary" icon="material-symbols:groups-outline-rounded" />
					</a>
				</div>
				<div class="tooltip tooltip-top" data-tip="View Races">
					<a href="/races/{event?.id}" class="btn btn-ghost p-1">
						<Icon class="text-3xl text-primary" icon="material-symbols:preview" />
					</a>
				</div>
				{#if data.user?.userId === event?.publisherId}
					<div class="tooltip tooltip-top" data-tip="Edit Event">
						<a href="/events/edit/{event?.id}?from={$page.url.pathname}" class="btn btn-ghost p-1">
							<Icon class="text-3xl  text-primary" icon="material-symbols:edit-outline" />
						</a>
					</div>
				{/if}
			</div>
		</div>
	</Page>
{/if}
