<script lang="ts">
	export let type: 'submit' | 'button' | 'reset' = 'submit'
</script>

<button {type} class="btn btn-primary mt-4 shadow-lg px-10 rounded-full fixed bottom-4 right-4">
	<slot />
</button>
