import { Link } from 'react-router-dom';
import '../styles/components/footer.scss';

export const Footer = () => {
	return (
		<>
			<footer className='footer-wrapper'>
				<nav className='footer-nav'>
					<ul>
						<li>
							<Link to='/'>Hem</Link>
						</li>
						<li>
							<Link to='/quiz'>Quiz</Link>
						</li>
						<li>
							<Link to='/recommendations'>Mina böcker</Link>
						</li>
						<li>
							<Link to='/'>FAQ</Link>
						</li>
					</ul>
				</nav>
				<article className='footer-info'>
					<p>
						Hidden Pages är en quiz-app för bokälskare! Utforska och
						få personliga rekommendationer för din nästa stora
						läsupplevelse.
					</p>
				</article>
			</footer>
		</>
	);
};
