<script lang="ts">
	import type { ActionData } from './$types'
	import Page from '$lib/components/layout/Page.svelte'
	import Check from '$lib/components/form/Check.svelte'
	import Input from '$lib/components/form/Input.svelte'
	import Button from '$lib/components/form/Button.svelte'
	export let form: ActionData
</script>

<Page>
	<form method="POST">
		<hgroup>
			<h2>Register</h2>
			<h4>
				Already have an account?<a href="/login" class="mx-2 font-medium cursor-pointer"> Login </a>
			</h4>
		</hgroup>
		<div class="divider mr-8 m-0" />
		<Input name="name" {form} value="" />
		<Input name="username" {form} value="" />
		<Input name="email" type="email" {form} value="" />
		<Input name="password" type="password" {form} value="" />
		<Input name="passwordConfirm" label="Confirm Password" type="password" {form} value="" />
		<Check name="terms" {form} />
		<Button type="submit">Register</Button>
	</form>
</Page>
