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
        # On place un '!' pour indiquer que la paramètre name est obligatoire ici
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
        name: String
        description: String
        members: [Member]
    }
`;

module.exports = typeDefs;