import { IGoogleBooksResponse } from '../models/apiInterfaces';
import '../styles/components/bookList.scss';

interface IBookListProps {
	books: IGoogleBooksResponse['items'];
	loading: boolean;
	error: string;
}

export const BookList = ({ books, loading, error }: IBookListProps) => {
	return (
		<>
			<section className='book-search'>
				<h2>Bokrekommendationer</h2>
				{loading && <p>Laddar böcker...</p>}{' '}
				{/* fixa någon typ av LOADER spinner */}
				{error && <p className='error-message'>{error}</p>}{' '}
				{/* fixa någon typ av ERROR msg popup */}
				<article className='book-list'>
					{books.length === 0 && !loading && !error && (
						<p>Inga resultat.</p>
					)}
					{books.map((book) => (
						<div key={book.id} className='book-item'>
							<h3>{book.volumeInfo.title}</h3>
							<img
								src={book.volumeInfo.imageLinks?.thumbnail}
								alt={book.volumeInfo.title}
							/>
							<p>{book.volumeInfo.authors?.join(', ')}</p>
						</div>
					))}
				</article>
			</section>
		</>
	);
};
