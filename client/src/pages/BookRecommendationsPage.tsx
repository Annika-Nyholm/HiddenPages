import { useLocation } from 'react-router-dom';
import { BookSearch } from '../components/BookSearch';

export const BookRecommendationsPage = () => {
	const location = useLocation();
	const keywords = location.state?.keywords || [];

	return (
		<>
			<BookSearch keywords={keywords} />
		</>
	);
};
