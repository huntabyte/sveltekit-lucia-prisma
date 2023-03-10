<script lang="ts">
	import Icon from '@iconify/svelte'
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
		<label for="org" class="label">Orgainzation</label>
		<div class="flex gap-4 items-center  w-full max-w-md">
			<select name="org" class="select select-bordered">
				{#if data.orgs}
					{#each data.orgs as org}
						<option value={org.id}>{org.name}</option>
					{/each}
				{:else}
					<option disabled selected value="">You have no organizations</option>
				{/if}
				<option>None</option>
			</select>
			<a href="/organization/new" class="btn btn-primary btn-circle btn-sm">
				<Icon class="text-3xl" icon="ic:baseline-add" />
			</a>
		</div>
		<Button class="mt-6 mb-8">Import</Button>
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
				<!-- <p>{event.user.name}</p> -->
			</div>
		</div>
	{/each}
</Page>
