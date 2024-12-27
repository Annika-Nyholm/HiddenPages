import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { LayoutPage } from './pages/LayoutPage';
import { QuizPage } from './pages/QuizPage';
import { BookRecommendationsPage } from './pages/BookRecommendationsPage';

export const Router = createBrowserRouter([
	{
		path: '/',
		element: <LayoutPage />,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				path: '/quiz',
                element: <QuizPage />,
			},
            {
                path: '/recommendations',
                element: <BookRecommendationsPage />
            }

		],
	},
]);
