import { useLocation } from 'react-router-dom';
import { BookSearch } from '../components/BookSearch';

export const BookRecommendationsPage = () => {
	const location = useLocation();
	const keywords = location.state?.keywords || [];

	return (
		<>
			<h2>Hidden Book Recommendations</h2>
			<BookSearch keywords={keywords} />
		</>
	);
};
