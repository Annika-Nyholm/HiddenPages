import { useNavigate } from 'react-router-dom';
import '../styles/components/bookCard.scss';

interface IBookCardProps {
	id: string;
	title: string;
	authors: string[];
	imageURL: string;
	rating?: number; // Betyg från Google Books
	ratingsCount?: number;
	genre?: string;
	year?: string;
}

export const BookCard = ({
	id,
	title = 'Saknar titel',
	authors = ['Okänd författare'],
	imageURL = 'placeholder.webp', //SÄTT PLACEHOLDER BILD!
	rating,
	ratingsCount,
	genre,
	year,
}: IBookCardProps) => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`/book/:${id}`);
	};

	const displayAuthors = () => {
		if (authors.length <= 2) {
			return authors.join(', ');
		}
		const displayedAuthors = authors.slice(0, 2).join(', ');
		return `${displayedAuthors} och fler`;
	};

	const displayRating = () => {
		if (!rating || !ratingsCount) return null;

		return (
			<p>
				Betyg: {rating} / 5 ({ratingsCount}{' '}
				{ratingsCount === 1 ? 'röst' : 'röster'})
			</p>
		);
	};

	return (
		<>
			<section
				className='card'
				role='button'
				tabIndex={0}
				onClick={handleClick}
			>
				<article className='card-image'>
					<img
						src={imageURL}
						alt={`Bokomslag för boktitel: ${title}`}
						width={100}
						height={150}
						loading='lazy'
					/>
				</article>
				<article className='card-content'>
					<div className='card-text'>
						<h3>{title}</h3>
						<p>
							{displayAuthors()} - {year?.split('-')[0]}
						</p>

						{displayRating()}

						{genre && <p>Genre: {genre}</p>}
						<span className='click-indicator'>Mer info →</span>
					</div>
				</article>
			</section>
		</>
	);
};
