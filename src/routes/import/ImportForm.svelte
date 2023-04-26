<script lang="ts">
	import { enhance } from '$app/forms'
	import Button from '$lib/components/form/Button.svelte'
	import Icon from '@iconify/svelte'
	export let orgs
</script>

<div>
	<form method="POST" enctype="multipart/form-data" use:enhance>
		<div class="flex flex-col">
			<label for="file" class="label">Sailwave File</label>
			<!-- multiple -->
			<input
				type="file"
				name="file"
				class="file-input file-input-bordered file-input-accent w-full max-w-lg"
			/>
			<label for="org" class="label mt-2">Orgainzation</label>
			<div class="flex gap-4 items-center w-full">
				<select name="org" class="select select-bordered w-72">
					{#if orgs}
						{#each orgs as org}
							<option value={org.id}>{org.name}</option>
						{/each}
					{:else}
						<option disabled selected value="">You have no organizations</option>
					{/if}
					<option value={null}>None</option>
				</select>
				<div class="tooltip tooltip-bottom-right" data-tip="Add Organization">
					<a href="/organization/edit/new?from=import" class="btn btn-primary btn-circle btn-sm">
						<Icon class="text-3xl" icon="ic:baseline-add" />
					</a>
				</div>
			</div>
			<Button class="mt-6 mb-8">Import</Button>
		</div>
	</form>
</div>
