import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBookDetails } from '../services/apiService';
import { executeWithLoadingAndErrorHandling } from '../utils/asyncHelpers';
import { IVolumeInfo } from '../models/apiInterfaces';
import { BooksContext } from '../contexts/BooksContext';
import { BookDetails } from './BookDetails';
import { LoadingSpinner } from './LoadingSpinner';
import { Popup } from './Popup';

export const FetchBookDetails = () => {
	const { bookId } = useParams<{ bookId: string }>();
	const [bookDetails, setBookDetails] = useState<IVolumeInfo | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [isPopupOpen, setIsPopupOpen] = useState(false);

	const context = useContext(BooksContext);
	const books = context?.books || [];

	const bookFromContext = books.find((book) => book.id === bookId);
	
	useEffect(() => {
		if (bookFromContext && !bookDetails) {
			
			setBookDetails(bookFromContext.volumeInfo);
			setLoading(false);
		} else if (!bookFromContext && bookId && !bookDetails) {
			const fetchDetails = async () => {
				await executeWithLoadingAndErrorHandling(
					async () => {
						if (bookId) {
							const data = await fetchBookDetails(bookId);
							setBookDetails(data);
						}
					},
					setLoading,
					setError
				);
			};

			fetchDetails();
		}
	}, [bookId, bookFromContext, bookDetails]);

	useEffect(() => {
		if (error || !bookDetails) {
			setIsPopupOpen(true);
		}
	}, [error, bookDetails]);

	const closePopup = () => {
		setIsPopupOpen(false);
	};

	if (loading)
		return (
			<div className='spinner-wrapper'>
				<LoadingSpinner />
			</div>
		);
	if (error || !bookDetails)
		return (
			<Popup
				message={error || 'Ingen information hittades för denna bok.'}
				isOpen={isPopupOpen}
				onClose={closePopup}
			/>
		);

	return <BookDetails book={bookDetails} />;
};
