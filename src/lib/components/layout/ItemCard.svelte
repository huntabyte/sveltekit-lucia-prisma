<script lang="ts">
	import { svelog } from '$lib/utils'
	import { fade, fly } from 'svelte/transition'
	// import Page from './generic/Page.svelte';
	// export let item
	export let title
	// console.log('item: ', item);
	// console.log('title: ', title);
	function getModifiedDate(timestamp) {
		return new Date(timestamp * 1000).toLocaleString()
	}
</script>

<div class="item-card mb-4 snap-center" in:fade={{ duration: 1000 }} out:fade={{ duration: 750 }}>
	<header on:click on:keyup>
		<div class:smaller={title.length >= 28}>
			{@html title}
		</div>
		<div class="mr-5 flex pt-1">
			<slot name="top-right" />
		</div>
	</header>
	<div class="divider " />
	<div class="flex">
		<slot />
	</div>
	<hr class="h1 my-2 mr-4 border-accent opacity-25" />
	<div class="pr-8 pb-2 text-right text-sm text-neutral-content">
		<slot name="bottom-right" />
	</div>
</div>

<!-- </Page> -->
<style>
	.smaller {
		@apply text-xl;
	}

	.item-card {
		@apply bg-base-100 shadow-md;
		@apply border-x-base-300 border-t-base-100 border-b-base-300;
		min-height: 8em;
		padding-top: 0.5em;
		padding-left: 1em;
		border-width: 1px;
		border-bottom-right-radius: 2em;
		border-top-left-radius: 1em;
		border-bottom-width: 0.25em;
		border-top-width: 1px;
		border-left-width: 1px;
	}

	.item-card > header {
		@apply flex justify-between pb-0 text-xl font-semibold;
		cursor: pointer;
		user-select: none;
	}

	.divider {
		/* @apply shadow-sm; */
		margin: 0;
		padding: 0;
		width: 80%;
	}
</style>
