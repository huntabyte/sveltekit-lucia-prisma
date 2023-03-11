<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms'
	import { page } from '$app/stores'
	import '../app.css'
	import type { PageData } from './$types'
	export let data: PageData

	const submitUpdateTheme: SubmitFunction = ({ action }) => {
		const theme = action.searchParams.get('theme')
		if (theme) {
			document.documentElement.setAttribute('data-theme', theme)
		}
	}

	const daisyThemes = [
		'dark',
		'light',
		'cupcake',
		'bumblebee',
		'emerald',
		'coporate',
		'synthwave',
		'retro',
		'cyberpunk',
		'valentine',
		'halloween',
		'garden',
		'forest',
		'aqua',
		'lofi',
		'pastel',
		'fantasy',
		'wireframe',
		'black',
		'luxury',
		'dracula',
		'cmyk',
		'autumn',
		'business',
		'acid',
		'lemonade',
		'night',
		'coffee',
		'winter'
	]
</script>

<div class="navbar p-4 pb-6 bg-base-300 fixed z-10 top-0">
	<div class="flex-1">
		<a href="/" class="btn btn-ghost normal-case text-xl">
			blog<span class="font-bold text-primary">LY </span>
		</a>
	</div>
	<div>
		<form method="POST" class="flex gap-3">
			<div class="flex-none">
				<ul class="menu menu-horizontal px-4 z-50 w-full">
					<li>
						<button type="button">Theme</button>
						<ul class="p-2 bg-base-100 w-full max-h-96 overflow-y-scroll ">
							<form method="post" use:enhance={submitUpdateTheme}>
								{#each daisyThemes as theme}
									<li>
										<button
											formaction={`/?/setTheme&theme=${theme}&redirectTo=${$page.url.pathname}`}
										>
											{theme}
										</button>
									</li>
								{/each}
							</form>
						</ul>
					</li>
				</ul>
			</div>
			<div><a href="/import" class="btn btn-ghost"> Import </a></div>
			{#if !data.user}
				<a href="/register" class="btn btn-ghost shadow-lg"> Register </a>
				<a href="/login" class="btn btn-circle shadow-lg btn-primary"> Login </a>
			{:else}
				<div class="flex flex-col items-center">
					<div class="text-xs mb-1">
						{data.user.name}
					</div>
					<button formaction="/logout" type="submit" class="btn btn-primary btn-sm  shadow-lg"
						>Logout</button
					>
				</div>
			{/if}
		</form>
	</div>
</div>
<slot />
