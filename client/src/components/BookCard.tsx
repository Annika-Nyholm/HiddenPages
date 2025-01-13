import '../styles/components/bookCard.scss';

interface IBookCardProps {
	title: string;
	authors: string[];
	imageURL: string;
	rating?: number; // Betyg från Google Books
	ratingsCount?: number;
	genre?: string; // Genre
	year?: string; // Publiceringsår
}

export const BookCard = ({
	title = 'Saknar titel',
	authors = ['Okänd författare'],
	imageURL = 'placeholder.webp', //SÄTT PLACEHOLDER BILD!
	rating,
	ratingsCount,
	genre,
	year,
}: IBookCardProps) => {
	
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
			<section className='card'>
				<article className='card-image'>
					<img
						src={imageURL}
						alt={title}
						width={100}
						height={150}
						loading='lazy'
					/>
				</article>
				<article className='card-content'>
					<h3>{title}</h3>
					<p>
						{displayAuthors()} - {year?.split('-')[0]}
					</p>

					{displayRating()}

					{genre && <p>Genre: {genre}</p>}
				</article>
			</section>
		</>
	);
};
