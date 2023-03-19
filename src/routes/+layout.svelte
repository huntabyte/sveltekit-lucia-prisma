<script lang="ts">
	import '../app.css'
	import { slide } from 'svelte/transition'
	import Icon from '@iconify/svelte'
	import { clickOutside } from '$lib/utils'
	import SubNav from '$lib/components/layout/SubNav.svelte'
	import { afterNavigate } from '$app/navigation'

	export let data

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
				<Icon class="text-3xl text-base-300" icon="ci:hamburger-lg" />
			</button>
			<div class="user-nav">
				<!-- <SignOut /> -->
				{#if data.user}
					<div
						class="dropdown-end dropdown avatar rounded-full border-2 border-neutral-content bg-base-200 drop-shadow-lg focus:bg-base-100"
					>
						<div tabindex="-1" class="w-10 rounded-full ">
							<img src={data.user?.avatar} alt={data.user?.name} />
						</div>
						<ul
							tabindex="-1"
							class=" dropdown-content menu rounded-box w-52 bg-base-100 p-2 text-base-content drop-shadow-lg"
						>
							<li><a href="/profile">Profile</a></li>
							<li><a href="/settings">Settings</a></li>
							<li><a href="/account">Account</a></li>
							<li><div class="divider m-0 p-0" /></li>
							<li>
								<form method="POST">
									<button formaction="/logout" type="submit">Logout</button>
								</form>
								<!-- on:click={() => auth.signOut()} -->
							</li>
						</ul>
					</div>
				{:else}
					<a href="/login" class="btn btn-primary btn-sm shadow-lg">Login</a>
					<a href="/register" class="btn btn-primary btn-sm shadow-lg">Register</a>
				{/if}
			</div>
		</nav>

		{#if open}
			<!-- this does not error in original -->
			<div
				use:clickOutside
				on:click_outside={handleClickOutside}
				class="disclosure-panel  absolute"
				transition:slide
			>
				<ul class="link-list">
					<a href="/import" on:click={toggleOpen}>
						<Icon icon="material-symbols:upload-rounded" /> Import
					</a>
					<a href="/events" on:click={toggleOpen}>
						<Icon icon="material-symbols:calendar-month" /> Events
					</a>
					<a href="/organization" on:click={toggleOpen}>
						<Icon icon="ic:outline-people-alt" /> Organizations
					</a>
					<a href="/community" on:click={toggleOpen}>
						<Icon icon="fluent:people-community-28-filled" /> Community
					</a>
					<a href="/news" on:click={toggleOpen}>
						<Icon icon="material-symbols:breaking-news-alt-1-outline" /> News
					</a>
					<a href="/series" on:click={toggleOpen}> <Icon icon="mdi:award" /> Series </a>
				</ul>
			</div>
		{/if}
	</div>
	<main>
		<slot />
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
		z-index: 10;
		padding-bottom: 3em;
		padding-top: 0.25em;
		padding-right: 0.5em;
		border-right-width: 0.25em;
		border-bottom-right-radius: 3em;
	}

	.link-list > a {
		@apply flex w-full gap-2 items-center px-4 py-2 text-left text-xl;
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
