import axios, { AxiosResponse } from 'axios';
import { IGoogleBooksResponse, IVolumeInfo } from '../models/apiInterfaces';

const api = axios.create({
	baseURL: 'https://www.googleapis.com/books/v1/',
	headers: {
		'Content-Type': 'application/json',
	},
});

const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

export const fetchBooks = async (
	searchQuery: string
): Promise<IGoogleBooksResponse> => {
	try {
		const response: AxiosResponse<IGoogleBooksResponse> = await api.get(
			'volumes',
			{
				params: {
					q: searchQuery,
					key: API_KEY,
				},
			}
		);
		return response.data;
	} catch (error) {
		console.error('error fetching books: ', error);
		throw new Error('Failed to fetch books. Please try again later.');
	}
};

export const fetchBookDetails = async (
	bookId: string
): Promise<IVolumeInfo | null> => {
	try {
		const response: AxiosResponse<{ volumeInfo: IVolumeInfo }> =
			await api.get(`volumes/${bookId}`, {
				params: {
					key: API_KEY,
				},
			});
		return response.data.volumeInfo || null;
	} catch (error) {
		console.error('Error fetching book details: ', error);
		throw new Error(
			'Failed to fetch book details. Please try again later.'
		);
	}
};

export default api;
