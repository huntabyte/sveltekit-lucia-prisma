<script lang="ts">
	import Button from '$lib/components/form/Button.svelte'
	import Page from '$lib/components/layout/Page.svelte'
	import Input from '$lib/components/form/Input.svelte'
	import type { ActionData, PageData } from './$types'
	import Textarea from '$lib/components/form/Textarea.svelte'
	// import { afterNavigate, beforeNavigate } from '$app/navigation'
	export let form: ActionData
	export let data: PageData

	const { user, org } = data
</script>

<Page title={org?.name === 'New Organization' ? 'Add a new Organization' : 'Edit Organization'}>
	<form method="POST">
		<Input name="name" {form} value={org?.name} />
		<Textarea name="description" rows={4} {form} value={org?.description ?? ''} />
		<Input name="website" {form} value={org?.website ?? ''} />
		<Input name="email" {form} value={org?.email ?? ''} />
		<Button position="float">Submit</Button>
	</form>
</Page>
