import { useLocation } from 'react-router-dom';
import { BookSearch } from '../components/BookSearch';
import '../styles/pages/bookRecommendationPage.scss';

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
