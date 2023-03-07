<script lang="ts">
	import type { PageData } from './$types'
	import Page from '$lib/components/layout/Page.svelte'
	export let data: PageData

	$: ({ articles, user } = data)
</script>

<Page className="flex flex-col gap-4 pr-4">
	<h2 class="font-medium text-xl ">Articles:</h2>
	{#each articles as article}
		<article class=" rounded-xl my-2 border border-base-300">
			<header class="text-lg font-medium bg-base-200 rounded-t-xl  p-2">{article.title}</header>
			<p class="m-4">
				{@html article.content}
			</p>
			<!-- {console.log(article)} -->
			<div class="text-sm p-4 text-right">{article.user.name}</div>
			{#if article.userId === data.user?.userId}
				<div class="flex justify-center gap-4 mb-4">
					<form action="?/deleteArticle&id={article.id}" method="POST">
						<button type="submit" class="btn btn-ghost border border-base-200 "
							>Delete Article</button
						>
					</form>
					<a href="/{article.id}" class="btn btn-ghost border border-base-300 "> Edit Article </a>
				</div>
			{/if}
		</article>
	{/each}
	{#if data.user}
		<form action="?/createArticle" method="POST" class="flex flex-col gap-2">
			<h3 class="text-xl font-medium ">New Article</h3>
			<label for="title"> Title </label>
			<input type="text" id="title" name="title" class="input input-bordered w-full max-w-xs" />
			<label for="title"> Content </label>
			<textarea id="content" name="content" rows={5} class="textarea textarea-bordered mb-2" />
			<button type="submit" class="btn btn-primary">Add Article</button>
		</form>
	{/if}
</Page>
