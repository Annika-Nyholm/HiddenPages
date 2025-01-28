import '../styles/components/bookCard.scss';
import { SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';

interface IBookCardProps {
	id: string;
	title: string;
	authors: string[];
	imageURL: string;
	rating?: number; // Rating from google books
	ratingsCount?: number;
	genre?: string;
	year?: string;
}

export const BookCard = ({
	id,
	title = 'Saknar titel',
	authors = [],
	imageURL = '/HP-placeholder-img.webp',
	rating,
	ratingsCount,
	genre,
	year,
}: IBookCardProps) => {
	const displayAuthors = () => {
		if (!Array.isArray(authors) || authors.length === 0) {
			return 'Okänd författare';
		}

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

	const handleImageUrl = (url: string | undefined) => {
		if (url && url.startsWith('http://')) {
			return url.replace('http://', 'https://');
		}
		return url;
	};

	const handleImageError = (
		event: SyntheticEvent<HTMLImageElement, Event>
	) => {
		event.currentTarget.src = '/HP-placeholder-img.webp';
	};

	return (
		<>
			<Link to={`/book/${id}`} className='card'>
				<article className='card-image'>
					<img
						src={handleImageUrl(imageURL)}
						alt={`Bokomslag för boktitel: ${title}`}
						width={100}
						height={150}
						loading='lazy'
						onError={handleImageError}
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
			</Link>
		</>
	);
};
