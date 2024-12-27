import { RouterProvider } from 'react-router-dom';
import { Router } from './Router';
import './App.scss';

function App() {
	return (
		<>
      <RouterProvider router={Router}></RouterProvider>
		</>
	);
}

export default App;
