import quizData from '../assets/data/book_quiz_questions.json';
import { IQuestion } from '../models/IQuiz';
import { getRandomQuestions } from '../utils/randomize';

export const fetchRandomQuiz = (count: number): IQuestion[] => {
    const { quiz } = quizData || { quiz: [] };
    
    if (!quiz || quiz.length === 0) {
        console.warn('No quiz data found');
        return [];
    }
    return getRandomQuestions(quiz, Math.min(count, quiz.length));
}