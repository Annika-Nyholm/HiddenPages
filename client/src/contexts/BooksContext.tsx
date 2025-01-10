import { createContext } from 'react';
import { IGoogleBooksResponse } from '../models/apiInterfaces';

interface IBooksContext {
	books: IGoogleBooksResponse['items'];
	loading: boolean;
	error: string;
	setBooks: (books: IGoogleBooksResponse['items']) => void;
	setLoading: (loading: boolean) => void;
	setError: (error: string) => void;
}

export const BooksContext = createContext<IBooksContext | undefined>(undefined);


