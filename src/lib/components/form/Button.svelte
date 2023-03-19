<script lang="ts">
	export let type: 'submit' | 'button' | 'reset' = 'submit'
	export let position: string | undefined = undefined
	export let clazz
	export { clazz as class }
	// refactor this to use $$rest_props or even $$props
</script>

{#if position === 'float'}
	<button
		{type}
		class={`btn btn-primary mt-4 shadow-lg px-10 rounded-full fixed bottom-14 right-8 ${clazz}`}
	>
		<slot />
	</button>
{:else}
	<button
		{type}
		class={`btn btn-primary mt-4 shadow-lg px-10 w-full max-w-md rounded-br-3xl ${clazz}`}
	>
		<slot />
	</button>
{/if}
