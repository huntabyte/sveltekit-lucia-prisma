<script lang="ts">
	import Button from '$lib/components/form/Button.svelte'
	import Page from '$lib/components/layout/Page.svelte'
	import type { PageData } from './$types'

	export let data: PageData
	const { user, org } = data
</script>

<Page>
	<h2>Edit Organization</h2>
	<form method="POST">
		<label for="name" class="label">Name</label>
		<input name="name" class="input input-bordered w-full max-w-md" value={org?.name} />
		<label for="description" class="label">Description</label>
		<textarea
			name="description"
			value={org?.description}
			rows={3}
			class="textarea textarea-bordered mb-2  w-full max-w-md"
		/>
		<label for="website" class="label">Website</label>
		<input name="website" value={org?.website} class="input input-bordered w-full max-w-md" />
		<label for="email" class="label">Email</label>
		<input name="email" value={org?.email} class="input input-bordered w-full max-w-md" />
		<Button position="float">Submit</Button>
	</form>
</Page>
