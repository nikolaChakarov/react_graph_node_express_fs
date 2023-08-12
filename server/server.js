import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import express from 'express';
import { readFile } from 'node:fs/promises';
import { resolvers } from './resolvers.js';

const PORT = 9000;

const app = express();
app.use(cors(), express.json());

const typeDefs = await readFile('./schema.graphql', 'utf-8');

const apolloServer = new ApolloServer({ typeDefs, resolvers });
await apolloServer.start();
app.use(expressMiddleware(apolloServer));

app.listen({ port: PORT }, () => {
	console.log(`Server running on port ${PORT}`);
	console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
});
