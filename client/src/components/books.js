import styled from 'styled-components';
import { useBooks } from '../lib/graphql/hooks';

import { useNavigate } from 'react-router-dom';

const Books = () => {
	const { books, loading, error } = useBooks();
	const navigate = useNavigate();

	const handleNavigate = (e) => {
		const bookId = e.currentTarget.dataset.id;
		navigate('/book', { state: { id: bookId } });
	};

	if (loading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>...server problem...</p>;
	}

	return (
		<BooksStyled className='books'>
			{books.map((b, idx) => (
				<div
					className='book'
					key={idx}
					data-id={b.id}
					onClick={handleNavigate}
				>
					<span>{b.title}</span>
					<span>{b.description}</span>
					<span>{b.price} $</span>
				</div>
			))}
		</BooksStyled>
	);
};

const BooksStyled = styled.div`
	display: flex;
	flex-direction: column;
	gap: 5px;

	.book {
		display: flex;
		gap: 10px;
		padding: 10px;
		border: 1px solid #000;
		cursor: pointer;
	}

	span {
		flex: 1;
	}
`;

export default Books;
