import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/pages/bookDetailsPage.scss';
import { FetchBookDetails } from '../components/FetchBookDetails';

export const BookDetailsPage = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const handleBack = () => {
		if (location.state?.fromBookList) {
			navigate(-1);
		} else {
			navigate('/');
		}
	};

	return (
		<>
			<section className='details-page-wrapper'>
				<button
					type='button'
					aria-label='navigera tillbaka till boklistan'
					onClick={handleBack}
				>
					<svg
						width='20'
						height='20'
						viewBox='0 0 20 20'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M8.82825 19.605L0.35313 10.9142C0.224719 10.7825 0.133547 10.6398 0.0796145 10.4862C0.026538 10.3326 0 10.168 0 9.9924C0 9.81683 0.026538 9.65223 0.0796145 9.49861C0.133547 9.34498 0.224719 9.20233 0.35313 9.07065L8.82825 0.379843C9.06367 0.138431 9.35773 0.0120199 9.71043 0.000607751C10.064 -0.00992656 10.3692 0.116485 10.626 0.379843C10.8828 0.621254 11.0168 0.922799 11.0279 1.28448C11.0382 1.64703 10.9149 1.95999 10.6581 2.22335L4.36597 8.67561H18.7159C19.0797 8.67561 19.3849 8.80159 19.6315 9.05353C19.8772 9.30636 20 9.61931 20 9.9924C20 10.3655 19.8772 10.678 19.6315 10.93C19.3849 11.1828 19.0797 11.3092 18.7159 11.3092H4.36597L10.6581 17.7615C10.8935 18.0029 11.0168 18.3101 11.0279 18.6832C11.0382 19.0563 10.9149 19.3636 10.6581 19.605C10.4227 19.8683 10.1231 20 9.75923 20C9.3954 20 9.08507 19.8683 8.82825 19.605Z'
							fill='#F3E5AB'
						/>
					</svg>
					Tillbaka
				</button>

				<FetchBookDetails />
			</section>
		</>
	);
};
