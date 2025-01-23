export const executeWithLoadingAndErrorHandling = async (
	action: () => Promise<void>,
	setLoading: (isLoading: boolean) => void,
	setError: (error: string) => void
) => {
	setLoading(true);
	setError('');
	try {
		await action();
	} catch (error) {
		if (error instanceof Error) {
			setError(error.message);
		} else {
			setError('Ett oväntat fel inträffade');
		}
	} finally {
		setLoading(false);
	}
};
