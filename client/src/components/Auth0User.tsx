import { useAuth0 } from '@auth0/auth0-react';

export const Auth0User = () => {
	const { user, isAuthenticated, isLoading } = useAuth0();

	if (isLoading) {
		return <div>Loading ...</div>;
	}

	return (
		<>
			{isAuthenticated && (
				<article>
					{user?.picture && (
						<img src={user.picture} alt={user.name} />
					)}
					<h2>{user?.name}</h2>
					<p>{user?.email}</p>
				</article>
			)}
		</>
	);
};
