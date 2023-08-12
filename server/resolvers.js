import { readFile, writeFile } from 'node:fs/promises';

export const resolvers = {
	Query: {
		book: async (_parent, { id }) => {
			const list = await readFile('./db.json', 'utf-8');
			const listJson = JSON.parse(list);

			const book = listJson.find((el) => el.id.toString() === id);
			console.log(book);
			return book;
		},
		books: async () => {
			const books = await readFile('./db.json', 'utf-8');
			return JSON.parse(books);
		},
	},

	Mutation: {
		createBook: async (_parent, args) => {
			const id = Date.now();
			const { title, description, price } = args.input;
			const list = await readFile('./db.json', 'utf-8');
			const listJson = JSON.parse(list);
			listJson.push({ id, title, description, price });

			await writeFile('./db.json', JSON.stringify(listJson));

			return { title, description, price };
		},

		updateBook: async (_parent, { id, input }) => {
			const list = await readFile('./db.json', 'utf-8');
			const listJson = JSON.parse(list);
			const index = listJson.findIndex((el) => el.id.toString() === id);

			const book = listJson[index];
			const newBook = Object.assign(book, { ...input });
			const newDB = [
				...listJson.slice(0, index),
				newBook,
				...listJson.slice(index + 1),
			];

			await writeFile('./db.json', JSON.stringify(newDB));

			return book;
		},
	},
};
