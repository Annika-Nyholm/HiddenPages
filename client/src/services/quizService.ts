import quizData from '../assets/data/newQuiz.json';
import { IQuestion } from '../models/IQuiz';

import { getRandomQuestions } from '../utils/randomize';

export const fetchRandomQuiz = (): IQuestion[] => {
	const { genre_questions, subject_questions, setting_questions } = quizData;

	if (!genre_questions || !subject_questions || !setting_questions) {
		console.warn('No quiz data found');
		return [];
	}

	const randomQuestions: IQuestion[] = [];

	const randomGenreQuestions = getRandomQuestions(genre_questions, 3);
	randomGenreQuestions.forEach((q) => {
		const questionWithCategory: IQuestion = { ...q, category: 'genre' };
		randomQuestions.push(questionWithCategory);
	});

	const randomSubjectQuestions = getRandomQuestions(subject_questions, 3);
	randomSubjectQuestions.forEach((q) => {
		const questionWithCategory: IQuestion = { ...q, category: 'subject' };
		randomQuestions.push(questionWithCategory);
	});

	const randomSettingQuestions = getRandomQuestions(setting_questions, 2);
	randomSettingQuestions.forEach((q) => {
		const questionWithCategory: IQuestion = { ...q, category: 'setting' };
		randomQuestions.push(questionWithCategory);
	});

	return randomQuestions;
};
