import { createContext } from "react";
import { IGoogleBooksResponse } from "../models/apiInterfaces";

interface IBooksContext {
	books: IGoogleBooksResponse['items'];
	setBooks: (books: IGoogleBooksResponse['items']) => void;
}

export const BooksContext = createContext<IBooksContext | null>(null);


