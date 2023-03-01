<script lang="ts">
	export let name: string
	export let form: any
	export let placeholder: string | undefined = undefined
	export let type: string | undefined = undefined
	export let label: string | undefined = undefined

	function capitalizeFirstLetter(string: string) {
		return string.charAt(0).toUpperCase() + string.slice(1)
	}
</script>

<label for={name} class="label">{label ? label : capitalizeFirstLetter(name)}</label>
<input
	type={type ? type : ''}
	id={name}
	{name}
	placeholder={placeholder ?? ''}
	value={form?.data?.[name] ? form?.data?.[name] : ''}
	class="input input-bordered w-full max-w-md {form?.errors?.[name]
		? 'input-error'
		: 'input-bordered'}"
/>
<label for={name} class="label">
	{#if form?.errors?.[name]}
		<span class="label-text-alt text-error">{form?.errors?.[name]}</span>
	{/if}
</label>
