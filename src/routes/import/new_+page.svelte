<script lang="ts">
	import Page from '$lib/components/layout/Page.svelte'

	export let data
	$: ({ orgs } = data)
	// This page should display the import form
</script>

<Page title="title">
	<br />
</Page>
