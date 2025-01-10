import { IGoogleBooksResponse } from '../models/apiInterfaces';

export const saveToLocalStorage = (
	key: string,
	value: IGoogleBooksResponse['items']
) => {
	try {
		const valueToStore = JSON.stringify(value);
		localStorage.setItem(key, valueToStore);
	} catch (error) {
		console.error('Failed to save to localStorage: ', error);
	}
};

export const getFromLocalStorage = (
	key: string
): IGoogleBooksResponse['items'] | null => {
	try {
		const storedValue = localStorage.getItem(key);
		if (storedValue) {
			return JSON.parse(storedValue);
		}
		return null;
	} catch (error) {
		console.error('Failed to retrieve from localStorage: ', error);
		return null;
	}
};

export const removeFromLocalStorage = (key: string) => {
	try {
		localStorage.removeItem(key);
	} catch (error) {
		console.error('Failed to remove from localStorage: ', error);
	}
};

export const clearLocalStorage = () => {
	try {
		localStorage.clear();
	} catch (error) {
		console.error('Failed to clear localStorage: ', error);
	}
};
