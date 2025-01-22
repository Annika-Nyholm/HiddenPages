import { useCallback, useEffect, useState } from 'react';
import { fetchBooks } from '../services/apiService';
import { IGoogleBooksResponse } from '../models/apiInterfaces';
import {
	getFromLocalStorage,
	saveToLocalStorage,
} from '../services/localStorageService';
import { BookList } from './BookList';
import { useBooks } from '../hooks/useBooks';
import { LoadingSpinner } from './LoadingSpinner';
import { Popup } from './Popup';

interface BookSearchProps {
	keywords: string[];
}

export const BookSearch = ({ keywords }: BookSearchProps) => {
	const { books, setBooks } = useBooks();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [isPopupOpen, setIsPopupOpen] = useState(false);

	const handleSearch = useCallback(async () => {
		if (keywords.length === 0) return;

		setLoading(true);
		setError('');
		try {
			const searchQuery =
				'subject:fiction ' +
				keywords.join(' OR ') + // Fler nyckelord kan matcha
				' -non-fiction -reference -manual -guide' +
				' -textbooks -academic' +
				'&langRestrict=sv' +
				'&printType=books' +
				'&maxResults=10';

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

	useEffect(() => {
		if (error) {
			setIsPopupOpen(true);
		}
	}, [error]);

	const closePopup = () => {
		setIsPopupOpen(false);
	};

	return (
		<>
			{loading && (
				<div className='spinner-wrapper'>
					<LoadingSpinner />
				</div>
			)}
			{error && (
				<Popup
					message={error}
					isOpen={isPopupOpen}
					onClose={closePopup}
				/>
			)}
			<BookList books={books} />
		</>
	);
};
