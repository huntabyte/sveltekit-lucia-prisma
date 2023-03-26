<script lang="ts">
	import type { ActionData, PageData } from './$types'
	import Page from '$lib/components/layout/Page.svelte'
	import Button from '$lib/components/form/Button.svelte'
	import Input from '$lib/components/form/Input.svelte'
	import Textarea from '$lib/components/form/Textarea.svelte'
	export let data: PageData
	export let form: ActionData
	$: ({ article } = data)
</script>

<Page title="Edit Article">
	<form action="?/updateArticle" method="post">
		<Input name="title" value={article.title} {form} />
		<Textarea name="content" rows={5} value={article.content} {form} />
		<Button>Update Article</Button>
	</form>
</Page>
