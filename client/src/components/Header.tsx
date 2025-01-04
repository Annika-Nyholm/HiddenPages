import { useState } from 'react';
import '../styles/components/header.scss';

export const Header = () => {
	const [menuOpen, setMenuOpen] = useState(false);

	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
	};

	return (
		<>
			<header className='main-banner'>
				<div className='banner-content'>
					<article className='banner-main'>
						<div className='banner-outer'>
							<div
								className='hamburger-menu'
								onClick={toggleMenu}
							>
								<div
									className={`hamburger-icon ${
										menuOpen ? 'open' : ''
									}`}
								>
								<span>M</span>
								</div>

								{menuOpen && (
									<div className='close-icon'>
										<span>X</span>
									</div>
								)}
							</div>
							<nav className='nav left-menu'>
								<ul>
									<li>
										<a href='/'>Hem</a>
									</li>
									<li>
										<a href='/quiz'>Quiz</a>
									</li>
								</ul>
							</nav>
							<nav className='nav-logo'>
								<a href='/'>
									<img
										src='/HiddenP_logo.webp'
										alt='hidden pages logo'
										width={200}
										height={130}
									/>
								</a>
							</nav>
							<nav className='nav right-menu'>
								<ul>
									<li>
										<a href='/recommendations'>
											Mina böcker
										</a>
									</li>
									<li>
										<a href='/'>FAQ</a>
									</li>
								</ul>
							</nav>
						</div>
						<div className='banner-end banner-left'></div>
						<div className='banner-end banner-right'></div>
					</article>
					{menuOpen && (
						<nav className='mobile-menu'>
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
					)}
				</div>
			</header>
		</>
	);
};
