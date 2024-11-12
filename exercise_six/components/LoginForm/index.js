export default function LoginForm() {
	return (
		<div>
			<h2>Login Form</h2>
			<form
			//onSubmit={(e) => createUser(e)}
			>
				<label htmlFor="email"> Email </label>
				<input
					type="email"
					name="email"
				/>

				<label htmlFor="password"> Password </label>
				<input
					type="password"
					name="password"
				/>

				<button type="submit">Create User</button>
			</form>
		</div>
	);
}
