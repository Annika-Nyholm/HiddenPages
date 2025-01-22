import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import '../styles/pages/layoutPage.scss';

export const LayoutPage = () => {
	const location = useLocation();

	const isBookDetailsPage = location.pathname.includes('/book/');

	return (
		<div>
			{!isBookDetailsPage && <Header />}
			<main>
				<Outlet></Outlet>
			</main>
			{!isBookDetailsPage &&<Footer />}
		</div>
	);
};
