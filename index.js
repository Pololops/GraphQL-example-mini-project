// Chargement du module dotenv pour gérer les variables d'environnement
require('dotenv').config();

// Chargement du module apollo-server pour gérer GraphQL
const { ApolloServer } = require('apollo-server');
const debug = require('debug')('Apollo');

const port = process.env.PORT || 5000;

const typeDefs = require(`./graphql/schema`);
const resolvers = require('./graphql/resolvers');

// Configuration du serveur GraphQL
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

// lancement du serveur en passant le paramètre server.url en attribut.
// ? { url } = server.url (c'est de la destructuration)
server.listen(port).then(({ url }) => {
    debug(`🚀 Server started on ${url}`);
});
