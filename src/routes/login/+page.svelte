<script lang="ts">
	import Button from '$lib/components/form/Button.svelte'
	import Input from '$lib/components/form/Input.svelte'
	import Page from '$lib/components/layout/Page.svelte'
	export let form: any
	console.log('form: ', form)
</script>

<Page>
	<form method="POST">
		<hgroup>
			<h2>Login</h2>
			<h4 class="">Don't have an account? <a href="/register" class="font-medium">Register</a></h4>
		</hgroup>
		<div class="divider m-0" />

		<Input name="username" {form} />
		<Input name="password" {form} />

		<Button>Login</Button>
	</form>
</Page>
