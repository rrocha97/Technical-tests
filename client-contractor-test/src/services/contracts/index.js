const { ContractStatus, ProfileTypes } = require('../../constants')
const contract = require('../../repositories/contracts')


const getContractById = async (id) => {
    if (!id) {
        throw ('id cannot be empty')
    }
    return await contract.findOneByid(id)
}

const getProfileContracts = async (profile) => {
    let contracts;
    if (profile.type === ProfileTypes.CLIENT) {
        contracts = await contract.findByClient(profile.id, [ContractStatus.IN_PROGRESS, ContractStatus.NEW])
    }
    else if (profile.type === ProfileTypes.CONTRACTOR) {
        contracts = await contract.findByContractor(profile.id, [ContractStatus.IN_PROGRESS, ContractStatus.NEW])
    }
    return contracts
}




module.exports = {
    getContractById,
    getProfileContracts

}