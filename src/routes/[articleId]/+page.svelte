<script lang="ts">
	import type { PageData } from './$types'

	export let data: PageData
	$: ({ article } = data)
</script>

<form action="?/updateArticle" method="POST">
	<h3>Editing: <span class="text-sm ml-4">{article.title}</span></h3>
	<label for="title" class="label"> Title </label>
	<input
		type="text"
		id="title"
		name="title"
		class="input input-bordered w-full max-w-xs"
		value={article.title}
	/>
	<label for="title" class="label"> Title </label>
	<textarea
		id="content"
		name="content"
		rows={5}
		class="textarea textarea-bordered w-full max-w-xs"
		value={article.content}
	/>
	<button type="submit" class="btn btn-primary block mt-2  w-full max-w-xs ">Update Article</button>
</form>
