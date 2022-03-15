const { families } = require('../../data/got');

module.exports = {
    family(parent) {
        return families.find((family) => family.id === parent.familyId);
    }
};
