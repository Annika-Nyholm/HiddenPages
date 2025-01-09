import { useState } from 'react';
import { fetchBooks } from '../services/api';
import { IGoogleBooksResponse } from '../models/apiInterfaces';
import '../styles/components/bookSearch.scss';

interface BookSearchProps {
	keywords: string[];
}

export const BookSearch = ({ keywords }: BookSearchProps) => {
	const [books, setBooks] = useState<IGoogleBooksResponse['items']>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>('');

	const handleSearch = async () => {
		if (keywords.length === 0) return;

		setLoading(true);
		setError('');
		try {
			const searchQuery =
				keywords.join('') + ' -non-fiction -reference -manual -guide';
			const response: IGoogleBooksResponse = await fetchBooks(
				searchQuery
			);
			console.log('svar från api: ', response.items);
			setBooks(response.items || []);
		} catch (err) {
			console.error(err);
			setError('Det gick inte att hämta böcker. Försök igen senare.');
		} finally {
			setLoading(false);
		}
	};

	if (!loading && books.length === 0 && !error) {
		handleSearch();
	}

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
