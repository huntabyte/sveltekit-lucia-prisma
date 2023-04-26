<script lang="ts">
	import { capitalizeFirstLetter } from '$lib/utils'

	export let name: string
	export let form
	// export let errors
	export let value
	export let label: string | undefined = undefined
	export let size: string | undefined = undefined
</script>

<div class="form-control w-full max-w-xs pb-2">
	<label class="label cursor-pointer justify-start space-x-4">
		<input
			type="checkbox"
			{name}
			{value}
			class="checkbox checkbox-primary {form?.errors?.[name] ? 'border-error' : ''} {size &&
				`checkbox-${size}`}"
		/>
		<span class="label-text {size && `text-${size}`}"
			>{label ? label : capitalizeFirstLetter(name)}</span
		>
	</label>
	<label for={name} class="label">
		{#if form?.errors?.[name]}
			<span class="label-text-alt text-error">{form?.errors?.[name]}</span>
		{/if}
	</label>
</div>
