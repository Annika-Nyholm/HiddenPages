import { useLocation } from 'react-router-dom';
import '../styles/pages/bookRecommendationPage.scss';
import { BookSearch } from '../components/BookSearch';

export const BookRecommendationsPage = () => {
	const location = useLocation();
	const keywords = location.state?.keywords || [];

	return (
		<>
			<section className='recommendation-wrapper'>
				<BookSearch keywords={keywords} />
			</section>
		</>
	);
};
