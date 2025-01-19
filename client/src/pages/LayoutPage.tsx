import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import '../styles/pages/layoutPage.scss';

export const LayoutPage = () => {
	const location = useLocation();

	const isHomePage = location.pathname === '/';
	const isBookDetailsPage = location.pathname.includes('/book/');

	return (
		<div className={isHomePage ? 'home-layout' : isBookDetailsPage ? 'book-details-layout' : 'app-layout'}>
			{!isBookDetailsPage && <Header />}
			<main>
				<Outlet></Outlet>
			</main>
			{!isBookDetailsPage &&<Footer />}
		</div>
	);
};
