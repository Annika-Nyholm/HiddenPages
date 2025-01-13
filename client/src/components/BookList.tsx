import { IGoogleBooksResponse } from '../models/apiInterfaces';
import '../styles/components/bookList.scss';
import { BookCard } from './BookCard';

interface IBookListProps {
	books: IGoogleBooksResponse['items'];
	loading: boolean;
	error: string;
}

export const BookList = ({ books, loading, error }: IBookListProps) => {
	return (
		<>
			{loading && <p>Laddar böcker...</p>}{' '}
			{/* fixa någon typ av LOADER spinner */}
			{error && <p className='error-message'>{error}</p>}{' '}
			{/* fixa någon typ av ERROR msg popup */}
			<article className='book-list'>
				{books.length === 0 && !loading && !error && (
					<p>Inga resultat.</p>
				)}
				{books.map((book) => {
					const imageUrl =
						book.volumeInfo.imageLinks?.medium ||
						book.volumeInfo.imageLinks?.thumbnail;
					return (
						<BookCard
							key={book.id}
							title={book.volumeInfo.title}
							authors={book.volumeInfo.authors}
							imageURL={imageUrl}
							rating={book.volumeInfo.averageRating}
							ratingsCount={book.volumeInfo.ratingsCount}
							genre={book.volumeInfo.categories?.join(', ')}
							year={book.volumeInfo.publishedDate}
						/>
					);
				})}
			</article>
		</>
	);
};
