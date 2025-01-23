import axios, { AxiosResponse } from 'axios';
import { IGoogleBooksResponse, IVolumeInfo } from '../models/apiInterfaces';

const api = axios.create({
	baseURL: 'https://www.googleapis.com/books/v1/',
	headers: {
		'Content-Type': 'application/json',
	},
});

const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

const handleApiError = (error: unknown): never => {
	if (axios.isAxiosError(error)) {
		if (error.response?.status === 429) {
			throw new Error(
				'För många förfrågningar. Vänta lite och försök igen'
			);
		}
		throw new Error(
			`Misslyckades att hämta data från API. Status: ${
				error.response?.status || 'Okänd'
			}`
		);
	}
	throw new Error('Ett oväntat fel inträffade.');
};

export const fetchBooks = async (
	searchQuery: string
): Promise<IGoogleBooksResponse> => {
	if (!searchQuery || searchQuery.trim() === '') {
		console.warn('Search query is empty. Skipping API call.');
		throw new Error('Söksträngen kan inte vare tom.');
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
		handleApiError(error);
		return Promise.reject();
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
		handleApiError(error);
		return Promise.reject();
	}
};

export default api;
