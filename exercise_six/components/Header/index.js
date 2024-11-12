// Header component for navigation and branding
export default function Header() {
	return (
		<header>
			<div>
				<div>
					<h1>Users & Auth</h1>
				</div>
				<nav>
                    <a href="/">Home</a>
                    <a href="/login">Login</a>
                    <a href="/createUser">Create</a>
                    
                </nav>
			</div>
		</header>
	);
}
