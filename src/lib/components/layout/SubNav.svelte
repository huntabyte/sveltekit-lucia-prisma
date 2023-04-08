<script>
	export let title
</script>

<div class="sub-nav">
	<div class="flex h-full items-center">
		<div class="text-3xl font-semibold select-none">{@html title}</div>
	</div>
</div>

<style>
	.sub-nav {
		@apply border-base-300 bg-base-100 shadow-md;
		@apply text-primary;
		display: flex;
		justify-content: space-between;
		position: fixed;
		z-index: 10;
		padding-right: 2em;
		padding-top: 4.75em;
		padding-bottom: 0.7em;
		padding-left: 1em;
		min-height: 8mem;
		width: 99%;
		border-width: 1px;
		border-bottom-right-radius: 4em;
	}
</style>
