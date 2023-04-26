<script lang="ts">
	import { capitalizeFirstLetter } from '$lib/utils'

	export let name: string
	export let form
	export let errors
	export let placeholder: string | undefined = undefined
	// export let type: string | undefined = undefined
	export let label: string | undefined = undefined
	// export let value: string | null | undefined = undefined
	// refactor to use $$props etc..
	// console.log('form: ', $errors)
</script>

<label for={name} class="label">{label ? label : capitalizeFirstLetter(name)}</label>
<input
	type="text"
	id={name}
	{name}
	placeholder={placeholder ?? ''}
	bind:value={$form[name]}
	class="input input-bordered w-full max-w-md {$errors[name] ? 'input-error' : 'input-bordered'}"
/>
<label for={name} class="label">
	{#if $errors[name]}
		<span class="label-text-alt text-error">{$errors[name]}</span>
	{/if}
</label>
