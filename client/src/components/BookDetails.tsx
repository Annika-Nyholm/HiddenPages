import { IVolumeInfo } from '../models/apiInterfaces';

interface IBookDetailsProps {
	book: IVolumeInfo;
}

export const BookDetails = ({ book }: IBookDetailsProps) => {
	return (
		<>
			<section className='book-details-wrapper'>
				<article className='details-image'>
					<img
						src={
							book.imageLinks.medium ||
							book.imageLinks.thumbnail ||
							'placeholder.webp'
						}
						alt={`Bokomslag för ${book.title}`}
						width={200}
						height={300}
					/>
				</article>
				<article className='details-fact'>
					<ul>
						<li>Titel: {book.title}</li>
						<li>Publicerad: {book.publishedDate} </li>
						<li>Författare: {book.authors.join(', ')} </li>
						<li>Kategorier: {book.categories?.join(', ')} </li>
						{book.averageRating && (
							<li>
								Betyg: {book.averageRating} / 5 (
								{book.ratingsCount} röster){' '}
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
				<article className='details-synposis'>
					<h3>Synopsis</h3>
					<p>{book.description || 'Ingen beskrivning tillgänglig'}</p>
				</article>
			</section>
		</>
	);
};
