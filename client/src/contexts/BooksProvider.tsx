import { ReactNode, useState } from "react";
import { IGoogleBooksResponse } from "../models/apiInterfaces";
import { BooksContext } from "./BooksContext";

export const BooksProvider = ({ children }: { children: ReactNode }) => {
	const [books, setBooks] = useState<IGoogleBooksResponse['items']>([]);
	
	return (
		<BooksContext.Provider
			value={{ books, setBooks }}
		>
			{children}
		</BooksContext.Provider>
	);
};