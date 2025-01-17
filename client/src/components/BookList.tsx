import { useRef } from 'react';
import { IGoogleBooksResponse } from '../models/apiInterfaces';
import '../styles/components/bookList.scss';
import { BookCard } from './BookCard';

interface IBookListProps {
	books: IGoogleBooksResponse['items'];
}

export const BookList = ({ books }: IBookListProps) => {
	const listRef = useRef<HTMLDivElement | null>(null);

	const scrollList = (direction: 'left' | 'right') => {
		if (listRef.current) {
			const scrollAmount = 500;
			listRef.current.scrollBy({
				left: direction === 'right' ? scrollAmount : -scrollAmount,
				behavior: 'smooth',
			});
		}
	};
	return (
		<>
			<div className='book-list-wrapper'>
				<article ref={listRef} className='book-list'>
					{books.length === 0 && <p>Inga resultat.</p>}
					{books.map((book) => {
						const imageUrl =
							book.volumeInfo.imageLinks?.medium ||
							book.volumeInfo.imageLinks?.thumbnail;
						return (
							<BookCard
								key={book.id}
								id={book.id}
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
				<button
					className='scroll-button scroll-right'
					type='button'
					aria-label='scrolla åt höger'
					onClick={() => scrollList('right')}
				>
					&gt;
				</button>
				<button
					className='scroll-button scroll-left'
					type='button'
					aria-label='scrolla åt vänster'
					onClick={() => scrollList('left')}
				>
					&lt;
				</button>
			</div>
		</>
	);
};
