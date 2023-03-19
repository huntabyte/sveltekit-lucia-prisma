<script>
	// import { subtitle } from '$lib/stores/stores';
	import { onDestroy } from 'svelte'
	import Icon from '@iconify/svelte'
	export let title
	// let unsubscribe = subtitle.subscribe((val) => {
	//   title = val;
	// });

	// onDestroy(unsubscribe);
</script>

<div class="sub-nav">
	<div class="flex h-full items-center">
		<div class="text-3xl font-semibold">{title}</div>
	</div>
	<!-- <div class="flex gap-1">
		<div class="tooltip-open tooltip-bottom" data-tip="Edit">
			<div class=" btn-ghost btn-circle btn">
				<Icon icon="mingcute:add-circle-fill" width="24" />
			</div>
		</div>
		<div class=" btn-ghost btn-circle btn">
			<Icon icon="mingcute:file-upload-fill" width="24" />
		</div>
	</div> -->
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
