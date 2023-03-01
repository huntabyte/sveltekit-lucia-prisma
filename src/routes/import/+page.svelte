<script>
	import Button from '$lib/components/form/Button.svelte'
	import Page from '$lib/components/layout/Page.svelte'
	// import { Populate } from '$lib/importers/sailwave'
	// import Blw from '$lib/importers/sailwave/Blw'

	async function importFile({ target }) {
		const file = target.files[0]
		// const pop = Populate({ file, userId: 'userId' })
	}
</script>

<Page>
	<form method="POST" enctype="multipart/form-data">
		<label for="file" class="label">Sailwave File</label>
		<input
			type="file"
			name="file"
			class="file-input file-input-bordered file-input-accent w-full max-w-md"
			on:change={importFile}
		/>
		<Button>Import</Button>
	</form>
</Page>
