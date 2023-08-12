import {
	ApolloClient,
	InMemoryCache,
	createHttpLink,
	concat,
	gql,
} from '@apollo/client';

const httpLink = createHttpLink({ uri: 'http://localhost:9000/graphql' });

export const apolloClient = new ApolloClient({
	link: concat(httpLink),
	cache: new InMemoryCache(),
});

export const GET_BOOK_BY_ID = gql`
	query getBookById($id: ID!) {
		book(id: $id) {
			description
			price
			title
		}
	}
`;

export const GET_ALL_BOOKS_QUERY = gql`
	query getAllBooksQuery {
		books {
			id
			title
			description
			price
		}
	}
`;

export const CREATE_UPDATE_BOOK_MUTATION = gql`
	mutation createBook($input: CreateBookInput!) {
		createBook(input: $input) {
			description
			price
			title
		}
	}
`;

export const UPDATE_BOOK_MUTATION = gql`
	mutation updateBookById($id: ID!, $input: UpdateBookInput!) {
		updateBook(id: $id, input: $input) {
			title
			price
			description
			id
		}
	}
`;
