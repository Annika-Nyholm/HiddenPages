import { RouterProvider } from 'react-router-dom';
import { Router } from './Router';
import './styles/App.scss';
import { BooksProvider } from './contexts/BooksProvider';


function App() {
	return (
		<>
			<BooksProvider>
				<RouterProvider router={Router}></RouterProvider>
			</BooksProvider>
		</>
	);
}

export default App;
