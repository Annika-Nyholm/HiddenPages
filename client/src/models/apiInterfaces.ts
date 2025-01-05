export interface IVolumeInfo {
	title: string;
	authors: string[];
	publisher: string;
	publishedDate: string;
	description: string;
	imageLinks: {
		thumbnail: string;
	};
}

export interface IGoogleBooksResponse {
	items: {
		kind: string;
		id: string;
		volumeInfo: IVolumeInfo;
	}[];
}
