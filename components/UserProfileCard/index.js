export default function UserProfileCard({userInformation}) {
	return (
		<div>
			<h2>User Profile</h2>
			<p>Email: {userInformation?.email}</p>
		</div>
	);
}
  