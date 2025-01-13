export interface IVolumeInfo {
	title: string;
	authors: string[];
	publisher: string;
	publishedDate: string;
	description: string;
	imageLinks: {
		medium?: string;
		thumbnail: string;
	};
	averageRating?: number;
	ratingsCount?: number;  
	categories?: string[];   
}

export interface IGoogleBooksResponse {
	items: {
		kind: string;
		id: string;
		volumeInfo: IVolumeInfo;
	}[];
}
