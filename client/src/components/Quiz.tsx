import { useState } from 'react';
import { IQuestion } from '../models/IQuiz';
import { fetchRandomQuiz } from '../services/quiz';
import '../styles/components/quiz.scss';

export const Quiz = () => {
	const [quiz, setQuiz] = useState<IQuestion[]>([]);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
	const [userAnswers, setUserAnswers] = useState<number[]>([]);
	const [selectedOption, setSelectedOption] = useState<number | null>(null);
	const [isQuizStarted, setIsQuizStarted] = useState<boolean>(false);

	const startQuiz = () => {
		const questions = fetchRandomQuiz(5);
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

	if (!isQuizStarted) {
		return (
			<>
				<article className='quiz-start'>
					<h2>Välkommen till Quizet!</h2>
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

	if (quiz.length === 0) return <p>Loading...</p>;

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
								onClick={() => {
									const allKeywords = userAnswers
										.map(
											(answerIndex, index) =>
												quiz[index].options[answerIndex]
													?.keywords || []
										)
										.flat(); // Flatten för att få alla nyckelord i en array
									console.log(
										'Rekommendationer baserat på: ',
										allKeywords
									); //bättre lösning kommer senare
								}}
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
