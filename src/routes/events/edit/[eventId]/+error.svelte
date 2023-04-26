<script lang="ts">
	import Page from '$lib/components/layout/Page.svelte'
	import { page } from '$app/stores'
</script>

<Page title="error">
	<h1>{$page.error?.message}</h1>
</Page>
