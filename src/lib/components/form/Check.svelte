<script lang="ts">
	export let name: string
	export let form: any
	export let label: string | undefined = undefined
</script>

<div class="form-control w-full max-w-xs pb-2">
	<label class="label cursor-pointer justify-start space-x-4">
		<input
			type="checkbox"
			{name}
			class="checkbox checkbox-primary {form?.errors?.[name] ? 'border-error' : ''}"
		/>
		<span class="label-text">{label ? label : 'I accept the terms and conditions'}</span>
	</label>
	<label for={name} class="label">
		{#if form?.errors?.[name]}
			<span class="label-text-alt text-error">{form?.errors?.[name]}</span>
		{/if}
	</label>
</div>
