import Link from "next/link";

// Header component for navigation and branding
export default function Header({ isLoggedIn, logoutUserFunction }) {
	return (
		<header>
			<div>
				<div>
					<h1>Users & Auth</h1>
				</div>
				<nav>
					<ul>
						{isLoggedIn && (
							<>
								<li>
									<Link href="/">Home</Link>
								</li>
								<li>
									<a onClick={logoutUserFunction}> Log Out</a>
								</li>
							</>
						)}
						{!isLoggedIn && (
							<>
								<li>
									<Link href="/login">Login</Link>
								</li>
								<li>
									<Link href="/create">Create User</Link>
								</li>
							</>
						)}
					</ul>
				</nav>
			</div>
		</header>
	);
}

//
