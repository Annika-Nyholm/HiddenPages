import '../styles/components/footer.scss';

export const Footer = () => {
	return (
		<>
			<footer className='footer-wrapper'>
				<nav className='footer-nav'>
					<ul>
						<li>
							<a href='/'>Hem</a>
						</li>
						<li>
							<a href='/quiz'>Quiz</a>
						</li>
						<li>
							<a href='/recommendations'>Mina böcker</a>
						</li>
						<li>
							<a href='/'>FAQ</a>
						</li>
					</ul>
				</nav>
				<article className="footer-info">
                    <p>Hidden Pages är en quiz-app för bokälskare! Utforska och få personliga rekommendationer för din nästa stora läsupplevelse.</p>
				</article>
			</footer>
		</>
	);
};
