<script lang="ts">
	import Page from '$lib/components/layout/Page.svelte'
	export let data
</script>

<Page>
	{#each data.orgs as org}
		<div class="my-4 border rounded-lg border-primary p-2 w-full max-w-md">
			<h2>{@html org.name}</h2>
			<a
				href={org.website && org.website.startsWith('http://')
					? org.website
					: `http://${org.website}`}>{org.website}</a
			>
			<div class="flex justify-between mr-4">
				<!-- <p>{org.Owner.name}</p> -->
				<!-- <p>{event.user.name}</p> -->
			</div>
		</div>
	{/each}
</Page>
