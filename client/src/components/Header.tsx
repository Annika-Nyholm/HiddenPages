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
							<div
								className='hamburger-menu'
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
