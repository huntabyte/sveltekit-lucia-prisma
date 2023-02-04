<script lang="ts">
	import '@picocss/pico'
</script>

<div class="container">
	<nav>
		<ul>
			<li>
				<strong>
					<a href="/"> Blogly </a>
				</strong>
			</li>
		</ul>
		<ul>
			<li><a href="/">Home</a></li>
			<li><a href="/register">Register</a></li>
			<li><a href="/login" role="button">Login</a></li>
		</ul>
	</nav>
	<slot />
</div>
