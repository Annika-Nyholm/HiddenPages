import { useState } from 'react';
import { fetchBooks } from '../services/api';
import { IGoogleBooksResponse } from '../models/apiInterfaces';
import '../components/bookSearch.scss';

export const BookSearch = () => {
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [books, setBooks] = useState<IGoogleBooksResponse['items']>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>('');

	const handleSearch = async () => {
		setLoading(true);
		setError('');
		try {
			const response: IGoogleBooksResponse = await fetchBooks(
				searchQuery
			);
            console.log('svar från api: ', response.items)
			setBooks(response.items || []);
		} catch (err) {
            console.error(err);
			setError('Det gick inte att hämta böcker. Försök igen senare.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<section className='book-search'>
				<h2>Sök böcker</h2>
				<input
					type='text'
					placeholder='Skriv en boktitel'
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
				<button onClick={handleSearch} disabled={loading}>
					{loading ? 'Laddar...' : 'Sök'}
				</button>

				{error && <p className='error-message'>{error}</p>}

				<div className='book-list'>
					{books.length === 0 && !loading && !error && (
						<p>Inga resultat.</p>
					)}
					{books.map((book) => (
						<div key={book.id} className='book-item'>
							<h3>{book.volumeInfo.title}</h3>
							<p>{book.volumeInfo.authors?.join(', ')}</p>
							<img
								src={book.volumeInfo.imageLinks?.thumbnail}
								alt={book.volumeInfo.title}
							/>
						</div>
					))}
				</div>
			</section>
		</>
	);
};
