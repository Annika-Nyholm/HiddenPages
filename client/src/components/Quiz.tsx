import { useState } from 'react';
import { IQuestion } from '../models/IQuiz';
import { fetchRandomQuiz } from '../services/quizService';
import '../styles/components/quiz.scss';
import { useNavigate } from 'react-router-dom';
import { removeFromLocalStorage } from '../services/localStorageService';
import { LoadingSpinner } from './LoadingSpinner';

export const Quiz = () => {
	const [quiz, setQuiz] = useState<IQuestion[]>([]);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
	const [userAnswers, setUserAnswers] = useState<number[]>([]);
	const [selectedOption, setSelectedOption] = useState<number | null>(null);
	const [isQuizStarted, setIsQuizStarted] = useState<boolean>(false);

	const navigate = useNavigate();

	const startQuiz = () => {
		removeFromLocalStorage('bookRecommendations');

		const questions = fetchRandomQuiz();
		setQuiz(questions);
		setIsQuizStarted(true);
		setCurrentQuestionIndex(0);
		setUserAnswers([]);
		setSelectedOption(null);
	};

	const handleNextQuestion = () => {
		if (selectedOption === null) {
			alert('Välj ett alternativ innan du går vidare!'); //Popup senare!
			return;
		}

		const updatedAnswers = [...userAnswers];
		updatedAnswers[currentQuestionIndex] = selectedOption;
		setUserAnswers(updatedAnswers);

		setSelectedOption(null);

		if (currentQuestionIndex < quiz.length - 1) {
			setCurrentQuestionIndex((prev) => prev + 1);
		}
	};

	const handlePrevQuestion = () => {
		if (currentQuestionIndex > 0) {
			setCurrentQuestionIndex(currentQuestionIndex - 1);
			const prevAnswer = userAnswers[currentQuestionIndex - 1];
			setSelectedOption(prevAnswer !== undefined ? prevAnswer : null);
		}
	};

	const getSortedKeywords = (
		keywords: string[]
	): { keyword: string; count: number }[] => {
		const frequencyMap = keywords.reduce((acc, keyword) => {
			acc[keyword] = (acc[keyword] || 0) + 1;
			return acc;
		}, {} as Record<string, number>);

		return Object.entries(frequencyMap)
			.map(([keyword, count]) => ({ keyword, count }))
			.sort((a, b) => b.count - a.count);
	};

	const handleShowRecommendations = () => {
		// Hämta genre nyckelord
		const genreKeywords = userAnswers
			.map((answerIndex, index) => {
				const question = quiz[index];
				if (question && question.options[answerIndex]?.keywords) {
					return question.options[answerIndex].keywords;
				}
				return [];
			})
			.flat();

		// Hämta subject nyckelord (börjar på index 3 för ämnesfrågor)
		const subjectKeywords = userAnswers
			.map((answerIndex, index) => {
				const question = quiz[index + 3]; // Index börjar på 3 för ämnesfrågor
				if (question && question.options[answerIndex]?.keywords) {
					return question.options[answerIndex].keywords;
				}
				return [];
			})
			.flat();

		// Hämta setting nyckelord (börjar på index 6 för miljöfrågor)
		const settingKeywords = userAnswers
			.map((answerIndex, index) => {
				const question = quiz[index + 6]; // Index börjar på 6 för miljöfrågor
				if (question && question.options[answerIndex]?.keywords) {
					return question.options[answerIndex].keywords;
				}
				return [];
			})
			.flat();

		// Använd getSortedKeywords för att sortera nyckelorden per kategori
		const sortedGenreKeywords = getSortedKeywords(genreKeywords).slice(
			0,
			2
		); // De 2 mest frekventa från genre
		const sortedSubjectKeywords = getSortedKeywords(subjectKeywords).slice(
			0,
			2
		); // De 2 mest frekventa från subject
		const sortedSettingKeywords = getSortedKeywords(settingKeywords).slice(
			0,
			1
		); // De 1 mest frekventa från setting

		// Sammanställ alla nyckelord
		const allKeywords = [
			...sortedGenreKeywords.map((k) => k.keyword),
			...sortedSubjectKeywords.map((k) => k.keyword),
			...sortedSettingKeywords.map((k) => k.keyword),
		];

		console.log('Nyckelord som används för sökning: ', allKeywords);

		navigate('/recommendations', {
			state: { keywords: allKeywords },
		});
	};

	if (!isQuizStarted) {
		return (
			<>
				<article className='quiz-start'>
					<h2>Välkommen till Quizet!</h2>
					<p>
						Något peppande och inspirerande skulle kanske kunna stå
						här. Let´s go!
					</p>
					<button
						className='start-button'
						type='button'
						aria-label='Starta quiz'
						data-content='Starta quiz'
						onClick={startQuiz}
					>
						Starta Quiz
					</button>
				</article>
			</>
		);
	}

	if (quiz.length === 0) return <LoadingSpinner />; /* skapa/använd SPINNER */

	const currentQuestion = quiz[currentQuestionIndex];

	return (
		<>
			<section className='quiz-wrapper'>
				<article className='question-card'>
					<h3>{currentQuestion.question}</h3>
					<ul>
						{currentQuestion.options.map((option, index) => (
							<li key={index}>
								<label>
									<input
										type='radio'
										name='quiz-option'
										value={index}
										checked={selectedOption === index}
										onChange={() =>
											setSelectedOption(index)
										}
									/>
									{option.text}
								</label>
							</li>
						))}
					</ul>
					<div className='button-wrapper'>
						{currentQuestionIndex > 0 && (
							<button
								className='back-button'
								type='button'
								aria-label='backa en fråga'
								onClick={handlePrevQuestion}
							>
								Tillbaka
							</button>
						)}
						{currentQuestionIndex < quiz.length - 1 ? (
							<button
								className='next-button'
								type='button'
								aria-label='nästa fråga'
								onClick={handleNextQuestion}
							>
								Nästa
							</button>
						) : (
							<button
								className='submit-button'
								type='button'
								aria-label='generera bokrekommendationer'
								onClick={handleShowRecommendations}
							>
								Visa rekommendationer
							</button>
						)}
					</div>
					<p>
						Fråga {currentQuestionIndex + 1} av {quiz.length}
					</p>
				</article>
			</section>
		</>
	);
};
