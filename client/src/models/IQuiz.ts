export interface IOption {
	text: string;
	keywords: string[];
}

export interface IQuestion {
	id: number;
	question: string;
	options: IOption[];
    category?: string;
}

export interface IQuiz {
	genre_questions?: IQuestion[];
	subject_questions?: IQuestion[];
	setting_questions?: IQuestion[];
}
