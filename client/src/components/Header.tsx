import { useState } from 'react';
import '../styles/components/header.scss';
import { Link } from 'react-router-dom';

export const Header = () => {
	const [menuOpen, setMenuOpen] = useState(false);

	const toggleMenu = () => {
		setMenuOpen((prev) => !prev);
	};

	return (
		<>
			<header className='main-banner'>
				<div className='banner-content'>
					<article className='banner-main'>
						<div className='banner-outer'>
							<button
								className='hamburger-menu'
								aria-label={
									menuOpen ? 'Stäng menyn' : 'Öppna menyn'
								}
								aria-expanded={menuOpen}
								aria-controls='main-menu'
								onClick={toggleMenu}
							>
								{!menuOpen && (
									<img
										src='/MenuOpen.png'
										alt='Open menu'
										className='menu-icon'
										width={44}
										height={44}
									/>
								)}

								{menuOpen && (
									<img
										src='/Close.png'
										alt='Close menu'
										className='close-icon'
										width={44}
										height={44}
									/>
								)}
							</button>
							<nav className='nav left-menu'>
								<ul>
									<li>
										<Link to='/'>Hem</Link>
									</li>
									<li>
										<Link to='/quiz'>Quiz</Link>
									</li>
								</ul>
							</nav>
							<nav className='nav-logo'>
								<Link to='/'>
									<img
										src='/HiddenP_logo.webp'
										alt='hidden pages logo'
										width={200}
										height={130}
									/>
								</Link>
							</nav>
							<nav className='nav right-menu'>
								<ul>
									<li>
										<Link to='/recommendations'>
											Mina böcker
										</Link>
									</li>
									<li>
										<Link to='/'>FAQ</Link>
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
									<Link to='/' onClick={toggleMenu}>Hem</Link>
								</li>
								<li>
									<Link to='/quiz' onClick={toggleMenu}>Quiz</Link>
								</li>
								<li>
									<Link to='/recommendations' onClick={toggleMenu}>
										Mina böcker
									</Link>
								</li>
								<li>
									<Link to='/' onClick={toggleMenu}>FAQ</Link>
								</li>
							</ul>
						</nav>
					)}
				</div>
			</header>
		</>
	);
};
