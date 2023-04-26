<script lang="ts">
	import Page from '$lib/components/layout/Page.svelte'
	import { superForm } from 'sveltekit-superforms/client'
	import type { PageData } from './$types'
	import EventEdit from './EventEdit.svelte'
	import { eventSchema } from './eventSchema'

	export let data: PageData

	const { form, errors, enhance, constraints } = superForm(data.form, {
		taintedMessage: 'Are you sure you want to leave?',
		validators: eventSchema,
		dataType: 'json'
	})
</script>

<Page title={$form.name}>
	<EventEdit {data} />
	<!-- <form method="post" use:enhance>
		<div class="form-control">
			<label class="label cursor-pointer">
				<span class="label-text">Public</span>
				<input type="checkbox" name="public" class="toggle toggle-success" checked={$form.public} />
			</label>
		</div>
		<TextInput name="name" {form} {errors} />
		<TextInput name="description" {form} {errors} />
		<TextInput name="eventwebsite" label="Website" {form} {errors} />
		<TextInput name="email" {form} {errors} />

		<TextInput name="titleImage" label="Title Image Url" {form} {errors} />
		<div class="label">Result Columns</div>
		<div class="divider m-0" />
		<div class="grid grid-cols-4">
			<Check name="rank" size="xs" value="rank" {form} />
			<Check name="points" size="xs" value="true" {form} />
			<Check name="position" size="xs" value="true" {form} />
			<Check name="skipper" size="xs" value="true" {form} />
			<Check name="boat" size="xs" value="true" {form} />
			<Check name="finish" size="xs" value="true" {form} />
			<Check name="corrected" size="xs" value="true" {form} />
			<Check name="elapsed" size="xs" value="true" {form} />
			<Check name="nett" size="xs" value="true" {form} />
			<Check name="total" size="xs" value="true" {form} />
		</div>
		<Button>Submit</Button>
	</form>
	<div class="mt-8">
		<SuperDebug data={$form} />
	</div> -->
</Page>
