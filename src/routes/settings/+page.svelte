<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms'
	import Button from '$lib/components/form/Button.svelte'
	import Page from '$lib/components/layout/Page.svelte'
	import { capitalizeFirstLetter, themes } from '$lib/utils'
	import type { PageData } from './$types'

	// const langMap = Object.values(Lang).map((val) => {
	// 	return val
	// })
	const langMap = ['english', 'french', 'spanish', 'italian', 'german']

	// export let form: ActionData
	// console.log('form: ', form)
	export let data: PageData
	$: ({ settings, user } = data)
	// $: ({ theme, language } = settings)

	const submitUpdateTheme: SubmitFunction = ({ action }) => {
		const theme = action.searchParams.get('theme')
		if (theme) {
			document.documentElement.setAttribute('data-theme', theme)
		}
	}
</script>

<Page title="User Settings">
	<form method="POST" use:enhance={submitUpdateTheme}>
		<label for="language" class="label"> Language </label>
		<select name="language" class="select select-bordered w-full max-w-md">
			{#each langMap as lang}
				<option value={lang} selected={lang === settings?.language}>
					{capitalizeFirstLetter(lang)}
				</option>
			{/each}
		</select>

		<label for="theme" class="label"> Theme </label>
		<select name="theme" class="select select-bordered w-full max-w-md">
			{#each themes as theme}
				<option value={theme} selected={theme === settings?.theme}>
					{capitalizeFirstLetter(theme)}
				</option>
			{/each}
		</select>
		<Button class="mt-6">Submit</Button>
	</form>
</Page>
