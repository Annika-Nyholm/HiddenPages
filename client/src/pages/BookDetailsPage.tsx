import { useNavigate } from 'react-router-dom';
import '../styles/pages/bookDetailsPage.scss';
import { FetchBookDetails } from '../components/FetchBookDetails';

export const BookDetailsPage = () => {
	const navigate = useNavigate();

	const handleBack = () => {
		navigate(-1);
	};

	return (
		<>
			<section className='details-page-wrapper'>
				<button
					type='button'
					aria-label='navigera tillbaka till boklistan'
					onClick={handleBack}
				>
					<span>pilikon</span>Tillbaka
				</button>
				<h2>Bokinformation</h2>
				<FetchBookDetails />
			</section>
		</>
	);
};
