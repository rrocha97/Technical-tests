const Profile = require('../../repositories/profiles')

const findProfileByid = async (profileId) => {
    let profile = await Profile.findOneByid(profileId);
    if (!profile) {
        throw ('this profile does not exist')
    }
    return profile
}

module.exports = {
    findProfileByid
}