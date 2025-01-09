import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import '../styles/pages/layoutPage.scss';

export const LayoutPage = () => {
	const location = useLocation();

	const isHomePage = location.pathname === '/';

	return (
		<div className={isHomePage ? 'home-layout' : 'app-layout'}>
			<Header />
			<main>
				<Outlet></Outlet>
			</main>
			<Footer />
		</div>
	);
};
