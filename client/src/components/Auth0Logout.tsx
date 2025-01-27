import { useAuth0 } from '@auth0/auth0-react';

export const Auth0Logout = () => {
	const { logout, isAuthenticated } = useAuth0();

	return (
		<>
			{isAuthenticated && (
				<button
					onClick={() =>
						logout({
							logoutParams: { returnTo: window.location.origin },
						})
					}
				>
					Logga ut
				</button>
			)}
		</>
	);
};
