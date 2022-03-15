// Chargement du module dotenv pour gérer les variables d'environnement
require('dotenv').config();

// Chargement du module apollo-server pour gérer GraphQL
const { ApolloServer } = require('apollo-server');
const debug = require('debug')('Apollo');

// Chargement des clés du fichier contenant les data
const { families, members } = require('./data/got');

const port = process.env.PORT || 5000;

// ? Définition du schema de query
/*
 * Le terme 'Query' est imposé par GraphQL
 * le nom des méthodes contenus dans 'Query' doivent avoir le même nom que dans 'resolver' (ici : 'test')
 * Un point d'exclamation dans un paramètre le rend obligatoire à rensigner pour exécuter la fonction
 * les doubles quote permettent de mettre de la doc dans notre GraphQL
 * Les triples quote permettent de mettre de la doc sur plusieurs lignes dans notre doc GraphQL
 */
const typeDefs = `
  type Query { 
    "Méthode de test"
    test(name: String, greeting: String): String

    "Tous les membres"
    members: [Member]

    "Les membre d'une famille"
    membersByFamily(name: String!): [Member]

    "Liste des familles"
    families: [Family]
  }

  type Member {
    id: Int
    name: String
    family: Family
  }

  type Family {
    name: String,
    description: String
    members: [Member]
  }
`;

// Objet qui va contenir les méthodes pour requêter les data
const resolvers = {
    Query: {
        // Les méthodes ici ne vont pas utiliser leur 1er argument
        test(_, { name, greeting }) {
            // return (greeting || 'Hello') + ' ' + (name || 'GraphQL') + ' !';
            return `${greeting || 'Hello'} ${name || 'GraphQL'} !`;
        },

        members() {
            return members;
        },

        membersByFamily(_, { name }) {
            const family = families.find((family) => family.name === name);

            if (!family) {
                return null;
            }

            return members.filter((member) => member.familyId === family.id);
        },

        families() {
            return families;
        },
    },

    // un sous objet qui a le même nom que le type défini dans 'typeDefs'
    Member: {
        family(parent) {
            debug(parent);
            return families.find((family) => family.id === parent.familyId);
        },
    },

    // un sous objet qui a le même nom que le type défini dans 'typeDefs'
    Family: {
        members(parent) {
            debug(parent);
            return members.filter((member) => member.familyId === parent.id);
        },
    },
};

// Configuration du serveur GraphQL
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

// lancement du serveur en passant le paramètre server.url en attribut.
// ? { url } = server.url (c'est de la destructuration)
server.listen(port).then(({ url }) => {
    debug(`Server started on ${url}`);
});
