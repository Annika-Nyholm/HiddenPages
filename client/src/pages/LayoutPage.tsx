import { Outlet, useLocation } from 'react-router-dom';
import '../styles/pages/layoutPage.scss';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

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
