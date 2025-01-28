import { SyntheticEvent } from 'react';
import { IVolumeInfo } from '../models/apiInterfaces';
import '../styles/components/bookDetails.scss';
import { sanitizeHtml } from '../utils/HTMLsanitize';

interface IBookDetailsProps {
	book: IVolumeInfo;
}

export const BookDetails = ({ book }: IBookDetailsProps) => {
	const sanitizedDescription = sanitizeHtml(
		book.description || 'Ingen beskrivning tillgänglig.'
	);

	const authors = Array.isArray(book.authors) ? book.authors : [];

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
			<section className='book-details-wrapper'>
				<article className='details-image'>
					<img
						src={
							handleImageUrl(book.imageLinks?.medium) ||
							handleImageUrl(book.imageLinks?.thumbnail)
						}
						alt={`Bokomslag för ${book.title}`}
						width={200}
						height={300}
						onError={handleImageError}
					/>
				</article>
				<article className='details-fact text-box'>
					<h3>Om boken:</h3>
					<ul>
						<li>
							<strong>Titel:</strong> {book.title}
						</li>
						<li>
							<strong>Publicerad:</strong> {book.publishedDate}{' '}
						</li>
						<li>
							<strong>Författare:</strong>{' '}
							{authors.length > 0
								? authors.join(', ')
								: 'Okänd författare'}{' '}
						</li>
						<li>
							<strong>Kategorier:</strong>{' '}
							{book.categories?.join(', ')}{' '}
						</li>
						{book.averageRating && (
							<li>
								<strong>Betyg:</strong> {book.averageRating} / 5
								({book.ratingsCount} röster){' '}
							</li>
						)}
					</ul>
					<a
						href={book.previewLink}
						target='_blank'
						rel='noopener noreferrer'
					>
						Se mer info från Google Books
					</a>
				</article>
				<article
					className='details-synopsis text-box'
					dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
				></article>
			</section>
		</>
	);
};
