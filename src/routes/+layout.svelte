<script lang="ts">
	import '../app.css'
	import { slide } from 'svelte/transition'
	import Icon from '@iconify/svelte'
	import { clickOutside } from '$lib/utils'
	import SubNav from '$lib/components/layout/SubNav.svelte'

	export let data

	console.log('data: ', data)
	let open = false

	function handleClickOutside() {
		open = false
	}

	const toggleOpen = () => (open = !open)
</script>

<div class="max-w-sm">
	<div class="fixed top-0 z-20  w-full ">
		<nav class="navbar border-base-300 text-secondary-content  ">
			<button on:click={toggleOpen} class="btn-ghost btn hover:bg-transparent">
				<Icon icon="ci:hamburger-lg" />
			</button>
			<div class="user-nav">
				<!-- <SignOut /> -->
				<button class="btn btn-sm">sign out</button>
				<div
					class="dropdown-end dropdown avatar rounded-full border-2 border-neutral-content bg-base-200 drop-shadow-lg focus:bg-base-100"
				>
					<div tabindex="-1" class="w-10 rounded-full ">
						<!-- <img src={$user?.photoURL} alt={$user?.displayName} /> -->
						<!-- <img src="" alt=""> -->
						<p>img</p>
					</div>
					<ul
						tabindex="-1"
						class=" dropdown-content menu rounded-box w-52 bg-base-100 p-2 text-neutral-content shadow"
					>
						<li><a href="/">Profile</a></li>
						<li><a href="/">Settings</a></li>
						<li><a href="/">Account</a></li>
						<li><div class="divider m-0 p-0" /></li>
						<li>
							<a href="/" on:keyup>Logout</a>
							<!-- on:click={() => auth.signOut()} -->
						</li>
					</ul>
				</div>
			</div>
		</nav>

		{#if open}
			<!-- on:click_outside={handleClickOutside} -->
			<div use:clickOutside class="disclosure-panel  absolute" transition:slide>
				<ul class="link-list">
					<a href="/import" on:click={toggleOpen}
						><Icon icon="material-symbols:upload-rounded" /> Import</a
					>
					<a href="/events" on:click={toggleOpen}
						><Icon icon="material-symbols:calendar-month" />Events</a
					>
					<a href="/organizations" on:click={toggleOpen}
						><Icon icon="ic:outline-people-alt" />Organizations</a
					>
					<a href="/community" on:click={toggleOpen}
						><Icon icon="fluent:people-community-28-filled" />Community</a
					>
					<a href="/news" on:click={toggleOpen}
						><Icon icon="material-symbols:breaking-news-alt-1-outline" />News</a
					>
					<a href="/series" on:click={toggleOpen}><Icon icon="mdi:award" />Series</a>
				</ul>
			</div>
		{/if}
	</div>
	<main>
		<SubNav />
		<div class="my-36">
			<slot />
		</div>
	</main>

	<footer class="shadow">
		<div class="text-base-200">copyright @footer</div>
	</footer>
</div>

<style>
	main {
		@apply bg-base-300;
		width: 100%;
		height: 100vh;
		position: absolute;
	}

	.shadow {
		box-shadow: inset 2px 0 10px hsla(0, 0%, 8%, 0.575);
	}

	footer {
		@apply bg-primary-focus text-base-200;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 2em;
		position: fixed;
		bottom: 0;
		border-top-left-radius: 2em;
	}

	.navbar {
		@apply bg-primary shadow-md;
		display: flex;
		justify-content: space-between;
		padding-inline-start: 0em;
		padding-inline-end: 2em;
		border-bottom-right-radius: 3em;
		border-bottom-width: 0.25em;
	}

	.disclosure-panel {
		@apply bg-base-100 shadow-lg;
		@apply border-base-300;
		/* height: 80vmax; */
		position: absolute;
		z-index: 10;
		padding-bottom: 3em;
		padding-top: 0.25em;
		width: 22ch;
		border-right-width: 0.25em;
		border-bottom-right-radius: 3em;
	}

	.link-list > a {
		@apply flex w-full gap-2 text-left;
		display: flex;
		gap: 2;
		width: 100%;
		/* padding: 1em; */
		border-radius: 0.75em;
	}

	.link-list > a:hover {
		@apply bg-base-300;
	}

	.user-nav {
		display: flex;
		gap: 0.5em;
		align-items: center;
	}
</style>
