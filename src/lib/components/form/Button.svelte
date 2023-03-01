<script lang="ts">
	export let type: 'submit' | 'button' | 'reset' = 'submit'
	export let position: string | undefined = undefined
</script>

{#if position === 'float'}
	<button {type} class="btn btn-primary mt-4 shadow-lg px-10 rounded-full fixed bottom-4 right-4">
		<slot />
	</button>
{:else}
	<button {type} class="btn btn-primary mt-4 shadow-lg px-10 w-full max-w-md">
		<slot />
	</button>
{/if}
