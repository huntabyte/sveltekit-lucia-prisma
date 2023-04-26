<script lang="ts">
	import SubNav from './SubNav.svelte'

	export let className: string | undefined = undefined
	export let title: string | null = ''
</script>

<div>
	<SubNav {title} />

	<div class="absolute">
		<div class=" mb-48 w-full h-full fixed top-0 overflow-scroll {className}">
			<div class="mx-4 mt-36 mb-8">
				<slot />
			</div>

			<footer class="footer p-10 bg-base-200 text-base-content mb-8">
				<button
					class="btn"
					on:click={() => {
						history.back()
					}}>Back</button
				>
				<div>
					<span class="footer-title">Services</span>
					<a href="/" class="link link-hover">Branding</a>
					<a href="/" class="link link-hover">Design</a>
					<a href="/" class="link link-hover">Marketing</a>
					<a href="/" class="link link-hover">Advertisement</a>
				</div>
				<div>
					<span class="footer-title">Company</span>
					<a href="/" class="link link-hover">About us</a>
					<a href="/" class="link link-hover">Contact</a>
					<a href="/" class="link link-hover">Jobs</a>
					<a href="/" class="link link-hover">Press kit</a>
				</div>
				<div>
					<span class="footer-title">Legal</span>
					<a href="/" class="link link-hover">Terms of use</a>
					<a href="/" class="link link-hover">Privacy policy</a>
					<a href="/" class="link link-hover">Cookie policy</a>
				</div>
				<div>
					<span class="footer-title">Newsletter</span>
					<div class="form-control w-80">
						<form method="POST">
							<label for="email" class="label">
								<span class="label-text">Enter your email address</span>
							</label>
							<div class="relative">
								<input
									type="text"
									name="email"
									placeholder="username@site.com"
									class="input input-bordered w-full pr-16"
								/>
								<button class="btn btn-primary absolute top-0 right-0 rounded-l-none">
									Subscribe
								</button>
							</div>
						</form>
					</div>
				</div>
			</footer>
		</div>
	</div>
</div>
