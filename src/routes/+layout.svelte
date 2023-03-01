<script lang="ts">
	import '../app.css'
	import type { PageData } from './$types'
	export let data: PageData
</script>

<div class="navbar p-4 pb-6 bg-base-300 fixed z-10 top-0">
	<div class="flex-1">
		<a href="/" class="btn btn-ghost normal-case text-xl">
			blog<span class="font-bold text-primary">LY </span>
		</a>
	</div>
	<div>
		<form method="POST" class="flex gap-3">
			<div><a href="/import" class="btn btn-ghost"> Import </a></div>
			{#if !data.user}
				<a href="/register" class="btn btn-ghost shadow-lg"> Register </a>
				<a href="/login" class="btn btn-circle shadow-lg btn-primary"> Login </a>
			{:else}
				<button formaction="/logout" type="submit" class="btn btn-primary  shadow-lg">
					{data.user.name}
				</button>
			{/if}
		</form>
	</div>
</div>
<slot />
