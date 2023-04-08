<script lang="ts">
	import '../app.css'
	import type { SubmitFunction } from '@sveltejs/kit'
	import { slide } from 'svelte/transition'
	import Icon from '@iconify/svelte'
	import { clickOutside } from '$lib/utils'
	import { enhance } from '$app/forms'
	import { themes } from '$lib/utils'
	import { page } from '$app/stores'

	export let data

	let open = false
	function handleClickOutside() {
		open = false
	}
	const toggleOpen = () => (open = !open)

	const submitUpdateTheme: SubmitFunction = ({ action }) => {
		const theme = action.searchParams.get('theme')
		if (theme) {
			document.documentElement.setAttribute('data-theme', theme)
		}
	}
</script>

<div class="max-w-sm">
	<div class="fixed top-0 z-20  w-full ">
		<nav class="navbar border-base-300 text-secondary-content ">
			<button on:click={toggleOpen} class="btn-ghost btn hover:bg-transparent">
				<Icon class="text-3xl text-base-300" icon="ci:hamburger-lg" />
			</button>

			<div class="flex-none">
				<ul class="menu menu-horizontal px-1 z-50 w-40">
					<li>
						<button>set the theme here</button>
						<ul class="p-2 bg-base-100 text-base-content w-full max-h-96 overflow-y-scroll">
							<form method="POST" use:enhance={submitUpdateTheme}>
								{#each themes as theme}
									<li>
										<button formaction="/?/setTheme&theme={theme}&redirectTo={$page.url.pathname}"
											>{theme}</button
										>
									</li>
								{/each}
							</form>
						</ul>
					</li>
				</ul>
			</div>
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
					<a href="/organization/all" on:click={toggleOpen}>
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
		<div class="btm-nav text-base-content">
			<button class="">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
					/></svg
				>
			</button>
			<button class="active">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					/></svg
				>
			</button>
			<button>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
					/></svg
				>
			</button>
		</div>
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
