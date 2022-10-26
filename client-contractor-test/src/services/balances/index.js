const { ContractStatus, ProfileTypes } = require('../../constants')
const Job = require('../../repositories/jobs')
const Profile = require('../../repositories/profiles')
const Jobs = require('../../services/jobs')
const ProfileService = require('../../services/profiles')

const verifiedDeposit = async (money, profile) => {
    if (money < 0) {
        throw ('money cannot be less than 0')
    }
    let Unpaidjobs = await Jobs.getUnpaidJobsByProfile(profile)
    isDespositExcessLimit(Unpaidjobs, money)
}


const isDespositExcessLimit = (Unpaidjobs, money) => {
    let totalPriceUnpaidjobs = Unpaidjobs.reduce((a, b) => a + b.price, 0);
    if (money > (totalPriceUnpaidjobs * 0.25)) {
        throw ('client cannot deposit more than 25% his total of jobs to pay')
    }
}
const postDepositToClient = async (userId, money, profile) => {
    await verifiedDeposit(money, profile)
    if (profile.balance <= money) {
        throw ('the client cannnot afford this deposit')
    }
    let userProfile = await ProfileService.findProfileByid(userId)
    await Profile.updateBalance(profile.id, -money)
    await Profile.updateBalance(userProfile.id, money)
    return `${profile.id} made the deposit of ${money} to ${userProfile.id}`
}




module.exports = {
    postDepositToClient
}