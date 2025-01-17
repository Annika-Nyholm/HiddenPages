import { useCallback, useEffect, useState } from 'react';
import { fetchBooks } from '../services/apiService';
import { IGoogleBooksResponse } from '../models/apiInterfaces';
import {
	getFromLocalStorage,
	saveToLocalStorage,
} from '../services/localStorageService';
import { BookList } from './BookList';
import { useBooks } from '../hooks/useBooks';

interface BookSearchProps {
	keywords: string[];
}

export const BookSearch = ({ keywords }: BookSearchProps) => {
	const { books, setBooks } = useBooks();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const handleSearch = useCallback(async () => {
		if (keywords.length === 0) return;

		setLoading(true);
		setError('');
		try {
			const searchQuery =
				keywords.join(' ') +
				' -non-fiction -reference -manual -guide' +
				'&printType=books';
			const response: IGoogleBooksResponse = await fetchBooks(
				searchQuery
			);
			console.log('Svar från API: ', response.items);

			saveToLocalStorage('bookRecommendations', response.items || []);
			setBooks(response.items || []);
		} catch (err) {
			console.error(err);
			setError('Det gick inte att hämta böcker. Försök igen senare.');
		} finally {
			setLoading(false);
		}
	}, [keywords, setBooks]);

	useEffect(() => {
		const savedBooks = getFromLocalStorage('bookRecommendations');
		if (savedBooks) {
			setBooks(savedBooks);
		} else {
			handleSearch();
		}
	}, [keywords, setBooks, handleSearch]);

	return (
		<>
			{loading && <p>Laddar böcker...</p>} {/* SPINNER??? */}
			{error && <p className="error-message">{error}</p>} 
			<BookList books={books} />
		</>
	);
};
