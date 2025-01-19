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
	if (!searchQuery || searchQuery.trim() === '') {
		console.warn('Search query is empty. Skipping API call.');
		throw new Error('Search query cannot be empty.');
	}

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
		if (axios.isAxiosError(error)) {
			
			if (error.response?.status === 429) {
				console.warn(
					'Rate limit exceeded. Please wait before retrying.'
				);
				throw new Error('Too many requests. Please try again later.');
			}

			throw new Error(
				`Failed to fetch books. Status: ${
					error.response?.status || 'Unknown'
				}`
			);
		}

		throw new Error('An unexpected error occurred.');
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
