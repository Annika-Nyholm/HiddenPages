import { useAuth0 } from '@auth0/auth0-react';

export const Auth0Login = () => {
	const { loginWithRedirect, isAuthenticated } = useAuth0();

	return (
		<>
			{!isAuthenticated && (
				<button onClick={() => loginWithRedirect()}>Logga in</button>
			)}
			
		</>
	);
};
