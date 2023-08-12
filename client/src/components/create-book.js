import styled from 'styled-components';
import { useForm } from './useForm';
import { useCreateBook, useUpdateBook } from '../lib/graphql/hooks';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import { useLazyQuery } from '@apollo/client';
import { GET_BOOK_BY_ID } from '../lib/graphql/queries';

const CreateBook = () => {
	const init = {
		title: '',
		description: '',
		price: '',
	};
	const location = useLocation();

	const [getBook, { loading: l, error: er }] = useLazyQuery(GET_BOOK_BY_ID, {
		variables: { id: location?.state?.id },
		fetchPolicy: 'network-only',
		onCompleted: (data) => {
			const { description, price, title } = data?.book;

			setValues((prev) => ({
				...prev,
				title,
				description,
				price,
			}));
		},
	});

	// console.log(location);

	const { createBook, loading, error } = useCreateBook();
	const { updateBook } = useUpdateBook();

	const validation = (val) => {
		const errors = {};
		if (!val.title) {
			errors.title = 'Please, enter book title';
		}
		if (!val.description) {
			errors.description = 'Please, enter book description';
		}
		if (!val.price) {
			errors.price = 'Please, enter book price';
		}
		return errors;
	};

	const onSubmit = async (val) => {
		const { title, description, price } = values;
		const res = location?.state?.id
			? await updateBook(location.state.id, title, description, price)
			: await createBook(title, description, price);

		console.log(res);
	};

	const { values, errors, setValues, handleChange, handleSubmit } = useForm({
		init,
		validation,
		onSubmit,
	});

	useEffect(() => {
		if (location?.state?.id) {
			console.log(location.state.id);
			getBook();
		}
	}, []);

	useEffect(() => {
		setValues(init);
	}, [location.state]);

	if (loading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>...Server problem...</p>;
	}

	return (
		<CreateBookStyled>
			<h1>{location.state ? 'Update Book' : 'Create Book'}</h1>

			{/* <div>
				<button onClick={getBook}>test</button>
			</div> */}

			<form onSubmit={handleSubmit}>
				<label htmlFor='title'>
					<span>Title</span>
					<input
						type='text'
						id='title'
						name='title'
						value={values.title}
						onChange={handleChange}
					/>
					{errors.title && <p>{errors.title}</p>}
				</label>

				<label htmlFor='description'>
					<span>Description</span>
					<textarea
						name='description'
						id='description'
						cols='30'
						rows='10'
						value={values.description}
						onChange={handleChange}
					></textarea>
					{errors.description && <p>{errors.description}</p>}
				</label>
				<label htmlFor='price'>
					<span>Price</span>
					<input
						type='text'
						name='price'
						id='price'
						value={values.price}
						onChange={handleChange}
					/>
					{errors.price && <p>{errors.price}</p>}
				</label>
				<div className='btn-wrapper'>
					<button type='submit'>
						{location.state ? 'Update' : 'Create'}
					</button>
				</div>
			</form>
		</CreateBookStyled>
	);
};

const CreateBookStyled = styled.div`
	padding: 20px;
	form {
		display: flex;
		flex-direction: column;
		gap: 10px;
		max-width: 50%;
	}

	label {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}
`;

export default CreateBook;
