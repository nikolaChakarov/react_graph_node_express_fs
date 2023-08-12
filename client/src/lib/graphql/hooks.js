import { useQuery, useMutation } from '@apollo/client';
import {
	GET_BOOK_BY_ID,
	GET_ALL_BOOKS_QUERY,
	CREATE_UPDATE_BOOK_MUTATION,
	UPDATE_BOOK_MUTATION,
} from './queries';

export const useBook = (id) => {
	const { data, loading, error } = useQuery(GET_BOOK_BY_ID, {
		variables: {
			id,
		},
	});

	return { book: data?.book, loading, error: Boolean(error) };
};

export const useBooks = () => {
	const { data, loading, error } = useQuery(GET_ALL_BOOKS_QUERY, {
		fetchPolicy: 'network-only',
	});

	return { books: data?.books, loading, error: Boolean(error) };
};

export const useCreateBook = () => {
	const [mutate, { loading, error }] = useMutation(
		CREATE_UPDATE_BOOK_MUTATION
	);

	const createBook = async (title, description, price) => {
		const res = await mutate({
			variables: {
				input: {
					title,
					description,
					price,
				},
			},
		});

		return res;
	};

	return { createBook, loading, error };
};

export const useUpdateBook = () => {
	const [mutate, { loading, error }] = useMutation(UPDATE_BOOK_MUTATION);

	const updateBook = async (id, title, description, price) => {
		const res = await mutate({
			variables: {
				id,
				input: {
					title,
					description,
					price,
				},
			},
		});
		return res;
	};

	return { updateBook, loading, error };
};
