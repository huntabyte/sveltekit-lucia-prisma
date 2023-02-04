<form>
	<hgroup>
		<h2>Register</h2>
		<h3>To post articles, you'll need an account.</h3>
	</hgroup>
	<div class="grid">
		<label for="firstname">
			First name
			<input type="text" id="firstname" name="firstname" required />
		</label>

		<label for="lastname">
			Last name
			<input type="text" id="lastname" name="lastname" required />
		</label>
	</div>

	<label for="email">Email address</label>
	<input type="email" id="email" name="email" required />

	<label for="email">Password</label>
	<input type="email" id="email" name="password" required />

	<button type="submit">Register</button>
</form>
<p>Already have an account? <a href="/login">Login</a></p>
