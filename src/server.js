const app = require('./app');
const { PORT } = require('./config');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs } = require('./typeDefs/index');
const { resolvers } = require('./resolvers/index');

const server = new ApolloServer({
	typeDefs,
	resolvers,
	introspection: true,
	playground: true,
});
// app.set('db', pool);
server.applyMiddleware({ app });

app.listen(PORT, () => {
	console.log(`Server started at http://localhost:4000${server.graphqlPath}`);
});
