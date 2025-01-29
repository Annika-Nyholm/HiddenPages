import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IQuestion } from '../models/IQuiz';
import { fetchRandomQuiz } from '../services/quizService';
import { removeFromLocalStorage } from '../services/localStorageService';
import '../styles/components/quiz.scss';
import { LoadingSpinner } from './LoadingSpinner';
import { Popup } from './Popup';

export const Quiz = () => {
	const [quiz, setQuiz] = useState<IQuestion[]>([]);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
	const [userAnswers, setUserAnswers] = useState<number[]>([]);
	const [selectedOption, setSelectedOption] = useState<number | null>(null);
	const [isQuizStarted, setIsQuizStarted] = useState<boolean>(false);
	const [isPopupOpen, setPopupOpen] = useState(false);

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
			setPopupOpen(true);
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
		if (selectedOption === null) {
			setPopupOpen(true);
			return;
		}
		// Hämta genrenyckelord
		const genreKeywords = userAnswers
			.map((answerIndex, index) => {
				const question = quiz[index];
				if (question && question.options[answerIndex]?.keywords) {
					return question.options[answerIndex].keywords;
				}
				return [];
			})
			.flat();

		// Hämta subjectnyckelord (börjar på index 3 för ämnesfrågor)
		const subjectKeywords = userAnswers
			.map((answerIndex, index) => {
				const question = quiz[index + 3];
				if (question && question.options[answerIndex]?.keywords) {
					return question.options[answerIndex].keywords;
				}
				return [];
			})
			.flat();

		// Hämta settingnyckelord (börjar på index 6 för miljöfrågor)
		const settingKeywords = userAnswers
			.map((answerIndex, index) => {
				const question = quiz[index + 6];
				if (question && question.options[answerIndex]?.keywords) {
					return question.options[answerIndex].keywords;
				}
				return [];
			})
			.flat();

		const sortedGenreKeywords = getSortedKeywords(genreKeywords).slice(
			0,
			2
		);
		const sortedSubjectKeywords = getSortedKeywords(subjectKeywords).slice(
			0,
			2
		);
		const sortedSettingKeywords = getSortedKeywords(settingKeywords).slice(
			0,
			1
		);

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
						Dags att ta reda på vad för typ av bokmal du är! 🐛
						Svara på några frågor, ha kul, och få boktips som passar
						dig perfekt. Nu kör vi!
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

	if (quiz.length === 0)
		return (
			<div className='spinner-wrapper'>
				<LoadingSpinner />
			</div>
		);

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

			<Popup
				message='Välj ett alternativ innan du går vidare!'
				isOpen={isPopupOpen}
				onClose={() => setPopupOpen(false)}
			/>
		</>
	);
};
