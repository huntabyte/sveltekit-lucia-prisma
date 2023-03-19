<script lang="ts">
	import type { PageData } from './$types'
	import Page from '$lib/components/layout/Page.svelte'
	import Input from '$lib/components/form/Input.svelte'
	import Button from '$lib/components/form/Button.svelte'
	export let form
	export let data: PageData
	console.log('data: ', data)
	$: ({ user, profile } = data)
</script>

<Page title="Your Profile">
	<form method="POST">
		<hgroup>
			<h3>username: {user?.username}</h3>
		</hgroup>

		<Input name="name" {form} value={user?.name} />
		<Input name="email" {form} value={user?.email} />
		<Input name="avatar" {form} value={user?.avatar} />

		<!-- <Input name="name" {form} value={'no'} /> -->
		<Button>Submit</Button>
	</form>
</Page>
