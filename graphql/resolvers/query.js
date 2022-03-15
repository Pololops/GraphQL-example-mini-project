const { families, members } = require('../../data/got');

module.exports = {
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
    }
};
