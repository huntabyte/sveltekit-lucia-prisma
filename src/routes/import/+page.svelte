<script lang="ts">
	import Page from '$lib/components/layout/Page.svelte'
	import ImportForm from './ImportForm.svelte'
	export let data
	$: ({ orgs } = data)

	// This page should be multi purpose
	// so make components for each concern
	// initialy this should show th import form
	// get event data
	// checkForDuplicates
	// show a page that has all the upload details/defaults that might need to be set
	//

	// question? can we get the json from the file here
	// maybe make this page not ssr?
	// will need to check for duplicates

	// possibly we // redesign it all
	// import should be apart of creating an event
	// So it should go - create event or update event then attach a resuslts file
</script>

<Page title="Import from File">
	<ImportForm {orgs} />
</Page>
