import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBookDetails } from '../services/apiService';
import { IVolumeInfo } from '../models/apiInterfaces';
import { BooksContext } from '../contexts/BooksContext';
import { BookDetails } from './BookDetails';
import { LoadingSpinner } from './LoadingSpinner';

export const FetchBookDetails = () => {
	const { bookId } = useParams<{ bookId: string }>();
	console.log('book id från useParams: ', bookId);

	const [bookDetails, setBookDetails] = useState<IVolumeInfo | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const context = useContext(BooksContext);
	const books = context?.books || [];

	const bookFromContext = books.find((book) => book.id === bookId);
	console.log('Books from context:', bookFromContext);

	useEffect(() => {
        console.log('useEffect kördes');

		if (bookFromContext && !bookDetails) {
            console.log('Bok från context används');
			setBookDetails(bookFromContext.volumeInfo);
			setLoading(false);
		} else if (!bookFromContext && bookId && !bookDetails) {
            console.log('Bok finns inte i context, hämtar från API');
			const fetchDetails = async () => {
				setLoading(true);
				setError(null);

				try {
					if (bookId) {
						const data = await fetchBookDetails(bookId);
                        console.log('Bokdata från API:', data);
						setBookDetails(data);
					}
				} catch (err) {
					console.error(err);
					setError(
						'Kunde inte hämta bokdetaljer. Försök igen senare.'
					);
				} finally {
					setLoading(false);
				}
			};
			fetchDetails();
		}
	}, [bookId, bookFromContext, bookDetails]);

    useEffect(() => {
		console.log('bookDetails uppdaterades: ', bookDetails);
	}, [bookDetails]);

	if (loading) return <LoadingSpinner />;
	if (error) return <p className='error-message'>{error}</p>;
	if (!bookDetails) return <p>Ingen information hittades för denna boken.</p>;

	return <BookDetails book={bookDetails} />;
};
