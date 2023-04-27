<script lang="ts">
	import type { PageData } from './$types'
	import Page from '$lib/components/layout/Page.svelte'
	import ImportForm from '../../import/ImportForm.svelte'

	export let data: PageData
	$: ({ orgs } = data)
	// Start with the fact that this will add an invoice to there account
	// Also have an option maual entry or import
</script>

<Page title="Create Event">
	<p>* Adding an event may incure costs to your account.</p>

	<ul class="steps w-full maw-w-md">
		<li class="step" class:step-primary={data.user}>Import</li>
		<li class="step">Verify</li>
		<li class="step">Publish</li>
	</ul>

	<ImportForm {orgs} />
	<p>Use Update event to keep your events in sync.</p>
	<button class="btn btn-primary">Enter Event manually</button>
</Page>
