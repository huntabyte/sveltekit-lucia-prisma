<script lang="ts">
	import Button from '$lib/components/form/Button.svelte'
	import Page from '$lib/components/layout/Page.svelte'
	export let data
</script>

<Page>
	<form method="POST" enctype="multipart/form-data">
		<label for="file" class="label">Sailwave File</label>
		<input
			type="file"
			name="file"
			class="file-input file-input-bordered file-input-accent w-full max-w-md"
		/>
		<Button>Import</Button>
	</form>

	{#each data.events as event}
		<div class="my-4 border rounded-lg border-primary p-2 w-full max-w-md">
			<h2>{@html event.name}</h2>
			<a
				href={event.eventwebsite && event.eventwebsite.startsWith('http://')
					? event.eventwebsite
					: `http://${event.eventwebsite}`}>{event.eventwebsite}</a
			>
			<div class="flex justify-between mr-4">
				<p>{event.venueName}</p>
				<p>{event.user.name}</p>
			</div>
		</div>
	{/each}
</Page>
