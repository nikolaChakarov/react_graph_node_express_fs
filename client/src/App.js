import { Routes, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './lib/graphql/queries';
import Navigation from './components/navigation';
import Books from './components/books';
import CreateBook from './components/create-book';

const App = () => {
	return (
		<ApolloProvider client={apolloClient}>
			<Navigation />

			<Routes>
				<Route path='/' element={<Books />} />
				<Route path='/book' element={<CreateBook />} />
			</Routes>
		</ApolloProvider>
	);
};

export default App;
