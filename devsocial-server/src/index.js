require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const { typeDefs, resolvers } = require('./schema');

async function startApolloServer(typeDefs, resolvers) {
  try {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req }) => ({ req })
    });
    const { url, port } = await server.listen({ port: process.env.PORT || 4000 });
    await mongoose.connect(process.env.MONGODB_URL);
    
    console.log(`
      🚀  Server is running
      🔗  Connected to MongoDB
      👂  Listening on port ${port}
      📭  Query at ${url}
    `);
  } catch (error) {
    console.log('Unable to start server: ', error.message);
    process.exit(1);
  }
}

startApolloServer(typeDefs, resolvers);
