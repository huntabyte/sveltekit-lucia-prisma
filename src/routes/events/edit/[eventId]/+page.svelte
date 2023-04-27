<script lang="ts">
	import Page from '$lib/components/layout/Page.svelte'
	import type { PageData } from './$types'
	import EventEdit from './EventEdit.svelte'

	export let data: PageData
	//
</script>

<Page title={data.form.data.name}>
	<EventEdit {data} />
</Page>
