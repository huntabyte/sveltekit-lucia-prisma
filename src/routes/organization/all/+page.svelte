<script lang="ts">
	import ItemCard from '$lib/components/layout/ItemCard.svelte'
	import Page from '$lib/components/layout/Page.svelte'
	import type { Organization } from '@prisma/client'
	// import type { PageData } from '../$types'

	export let data: OrganisationData

	interface OrganisationData {
		orgs: Organization[]
	}
</script>

<Page title="Your Organizations">
	<!-- // @ts-ignore -->
	{#each data.orgs as org}
		<ItemCard title={org.name} href="/organization/view/{org.id}">
			<div>{org.description}</div>
			<div slot="bottom-right">right</div>
		</ItemCard>
	{/each}
</Page>
