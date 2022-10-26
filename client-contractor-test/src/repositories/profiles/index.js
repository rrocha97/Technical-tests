const { Profile } = require('../../model')

const findOneByid = async (id) => {
    return await Profile.findOne({ where: { id } })
}


const updateBalance = async (id, balance) => {
    return Profile.increment({ balance: balance }, { where: { id } })
}

module.exports = {
    findOneByid,
    updateBalance
}