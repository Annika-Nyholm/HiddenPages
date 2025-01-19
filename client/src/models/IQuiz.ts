export interface IOption {
    text: string;
    keywords: string[];
}

export interface IQuestion {
    id: number;
    question: string;
    options: IOption[];
}

export interface IQuiz {
    quiz: IQuestion[];
}