<script lang="ts">
	import Button from '$lib/components/form/Button.svelte'
	import Page from '$lib/components/layout/Page.svelte'
	import Input from '$lib/components/form/Input.svelte'
	import type { ActionData, PageData } from './$types'
	import Textarea from '$lib/components/form/Textarea.svelte'
	export let form: ActionData
	export let data: PageData
	const { user, org } = data
</script>

<Page>
	<form method="POST">
		<hgroup>
			{#if org?.name === 'New Organization'}
				<h2>Add a new Organization</h2>
			{:else}
				<h2>Edit Organization</h2>
			{/if}
			<!-- <h4>
				<a href="#" class="mx-2 font-medium cursor-pointer"> Cancel </a>
			</h4> -->
		</hgroup>
		<div class="divider mr-8 m-0" />
		<Input name="name" {form} value={org?.name} />
		<Textarea name="description" rows={4} {form} value={org?.description ?? ''} />
		<Input name="website" {form} value={org?.website ?? ''} />
		<Input name="email" {form} value={org?.email ?? ''} />
		<Button position="float">Submit</Button>
	</form>
</Page>
