import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import '../styles/pages/layoutPage.scss';

export const LayoutPage = () => {
	return (
		<>
			<Header />
			<main>
				<Outlet></Outlet>
			</main>
			<Footer />
		</>
	);
};
