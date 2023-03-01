<script lang="ts">
	export let className: string | undefined = undefined
</script>

<div class="mx-4 mb-28 w-full h-full fixed top-24 overflow-scroll {className}">
	<div class="mb-28">
		<slot />
	</div>
</div>
