import { ReactNode, useState } from "react";
import { IGoogleBooksResponse } from "../models/apiInterfaces";
import { BooksContext } from "./BooksContext";

export const BooksProvider = ({ children }: { children: ReactNode }) => {
	const [books, setBooks] = useState<IGoogleBooksResponse['items']>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>('');
	
	return (
		<BooksContext.Provider
			value={{ books, loading, error, setBooks, setLoading, setError }}
		>
			{children}
		</BooksContext.Provider>
	);
};