<script lang="ts">
	import type { PageData } from './$types'
	import Page from '$lib/components/layout/Page.svelte'
	import type { Comp } from '@prisma/client'
	import Icon from '@iconify/svelte'

	export let data: PageData
	$: ({ comp } = data)

	const getHref = (org: Comp | undefined) => {
		if (!org) return null
		return '/'
		// return org?.website && org.website.startsWith('http://')
		// 	? org.website
		// 	: `http://${org?.website}`
	}
</script>

#{#if comp}
	<!-- content here -->
	<Page title={comp?.boat}>
		<div class="max-w-md mx-auto bg-base-100 rounded-xl shadow-md overflow-hidden md:max-w-2xl">
			<div class="md:flex">
				<div class="md:shrink-0">
					<img
						class="h-48 w-full object-cover md:h-full md:w-48 rounded-br-full"
						src={comp?.titleImage ? comp?.titleImage : 'https://picsum.photos/id/384/400/300/'}
						alt="Title for {comp?.boat}"
					/>
				</div>
				<div class="pt-8 pb-4 px-8">
					<div class="uppercase tracking-wide text-sm text-accent font-semibold">
						{@html comp?.boat}
					</div>
					<a
						href={getHref(comp)}
						class="block mt-1 text-lg leading-tight font-medium text-base-content hover:underline"
					>
						{comp?.fleet}
					</a>
					<p class="mt-2 text-base-content">
						{comp?.fleet ? comp?.fleet : 'No description provided'}
					</p>
					<a href={getHref(comp)} class="text-secondary">{comp?.skipper} </a>
				</div>
			</div>
			<div class="px-4 pb-4  flex justify-end">
				<div class="tooltip tooltip-top" data-tip="View Competitors">
					<a href="/comps/{comp?.id}" class="btn btn-ghost p-1">
						<Icon class="text-3xl text-primary" icon="material-symbols:groups-outline-rounded" />
					</a>
				</div>
				<div class="tooltip tooltip-top" data-tip="View Races">
					<a href="/races/{comp?.id}" class="btn btn-ghost p-1">
						<Icon class="text-3xl text-primary" icon="material-symbols:preview" />
					</a>
				</div>
				<div class="tooltip tooltip-top" data-tip="Edit Event">
					<a href="/event/{comp?.id}" class="btn btn-ghost p-1">
						<Icon class="text-3xl  text-primary" icon="material-symbols:edit-outline" />
					</a>
				</div>
			</div>
		</div>
	</Page>
{:else}
	<div>Loading...</div>
{/if}
