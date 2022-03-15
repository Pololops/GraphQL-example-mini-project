const { members } = require('../../data/got');

module.exports = {
    members(parent) {
        return members.filter((member) => member.familyId === parent.id);
    }
};
