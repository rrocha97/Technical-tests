const Profile = require('../../repositories/profiles')

const findProfileByid = async (profileId) => {
    let job = await Profile.findOneByid(profileId);
    if (!job) {
        throw ('this profile does not exist')
    }
    return job
}

module.exports = {
    findProfileByid
}