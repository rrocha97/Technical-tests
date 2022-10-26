const { Contract } = require('../../model')

const findOneByid = async (id) => {
    return await Contract.findOne({ where: { id } })
}

const findByClient = async (idClient, statuses) => {
    return await Contract.findAll(
        { where: { ClientId: idClient, status: statuses } })
}
const findByContractor = async (idClient, statuses) => {
    return await Contract.findAll(
        { where: { ContractorId: idClient, status: statuses } })
}


module.exports = {
    findOneByid,
    findByClient,
    findByContractor
}