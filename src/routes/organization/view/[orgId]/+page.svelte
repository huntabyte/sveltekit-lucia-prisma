<script lang="ts">
	import Page from '$lib/components/layout/Page.svelte'
	import Icon from '@iconify/svelte'
	import type { Organization } from '@prisma/client'
	import type { PageData } from './$types'

	export let data: PageData
	console.log('data: ', data)
	$: ({ org } = data)

	const getHref = (org: Organization | undefined) => {
		if (!org) return null
		return org?.website && org.website.startsWith('http://')
			? org.website
			: `http://${org?.website}`
	}
</script>

<Page title={org?.name}>
	<div class="max-w-md mx-auto bg-base-100 rounded-xl shadow-md overflow-hidden md:max-w-2xl">
		<div class="md:flex">
			<div class="md:shrink-0">
				<img
					class="h-48 w-full object-cover md:h-full md:w-48 rounded-br-full"
					src={org?.titleImage ? org?.titleImage : 'https://picsum.photos/id/384/400/300/'}
					alt="Title for {org?.name}"
				/>
			</div>
			<div class="pt-8 pb-4 px-8">
				<div class="uppercase tracking-wide text-sm text-accent font-semibold">
					{@html org?.name}
				</div>
				<a
					href={getHref(org)}
					class="block mt-1 text-lg leading-tight font-medium text-base-content hover:underline"
				>
					{org?.email}
				</a>
				<p class="mt-2 text-base-content">
					{org?.description ? org?.description : 'No description provided'}
				</p>
				<a href={getHref(org)} class="text-secondary">{org?.website} </a>
			</div>
		</div>
		<div class="px-4 pb-4  flex justify-end">
			<div class="tooltip tooltip-top" data-tip="View Competitors">
				<a href="/comps/{org?.id}" class="btn btn-ghost p-1">
					<Icon class="text-3xl text-primary" icon="material-symbols:groups-outline-rounded" />
				</a>
			</div>
			<div class="tooltip tooltip-top" data-tip="View Races">
				<a href="/races/{org?.id}" class="btn btn-ghost p-1">
					<Icon class="text-3xl text-primary" icon="material-symbols:preview" />
				</a>
			</div>
			<div class="tooltip tooltip-top" data-tip="Edit Event">
				<a href="/event/{org?.id}" class="btn btn-ghost p-1">
					<Icon class="text-3xl  text-primary" icon="material-symbols:edit-outline" />
				</a>
			</div>
		</div>
	</div>
</Page>
