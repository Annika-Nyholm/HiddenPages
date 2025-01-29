import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import '../styles/components/header.scss';

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
										<NavLink to='/'>Hem</NavLink>
									</li>
									<li>
										<NavLink to='/quiz'>Quiz</NavLink>
									</li>
								</ul>
							</nav>
							<nav className='nav-logo'>
								<Link to='/'>
									<img
										src='/HiddenP_logo.webp'
										alt='hidden pages logo'
										width={200}
										height={108}
									/>
								</Link>
							</nav>
							<nav className='nav right-menu'>
								<ul>
									<li>
										<NavLink to='/recommendations'>
											Mina böcker
										</NavLink>
									</li>
									<li>
										<NavLink to='/faq'>FAQ</NavLink>
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
									<Link to='/faq' onClick={toggleMenu}>FAQ</Link>
								</li>
							</ul>
						</nav>
					)}
				</div>
			</header>
		</>
	);
};
