const Profile = require('../repositories/profiles')
const getProfile = async (req, res, next) => {
    const profile = await Profile.findOneByid(req.get('profile_id') || 0)
    if (!profile) return res.status(401).end()
    req.profile = profile
    next()
}
module.exports = { getProfile }
