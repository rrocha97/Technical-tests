const { Contract, Job } = require('../../model')
const { Op } = require('sequelize')

const findUnpaidJobsByClient = async (idClient, statuses) => {
    return await Job.findAll(
        {
            include: {
                model: Contract,
                as: 'Contract',
                where: { ClientId: idClient, status: statuses }
            },
            where: {
                [Op.or]: [
                    { paid: null },
                    { paid: false }
                ]
            }
        }
    )
}
const findUnpaidJobsByContractor = async (idContractor, statuses) => {
    return await Job.findAll(
        {
            include: {
                model: Contract,
                as: 'Contract',
                where: { ContractorId: idContractor, status: statuses }
            },
            where: {
                [Op.or]: [
                    { paid: null },
                    { paid: false }
                ]
            }
        }
    )
}
const findOneByid = async (id) => {
    return await Job.findOne(
        {
            include: {
                model: Contract,
                as: 'Contract',
                required: true
            },
            where: { id }
        })
}
const payJob = async (id) => {
    return await Job.update({ paid: true, paymentDate: new Date() }, {
        where: {
            id: id
        }
    });
}


module.exports = {
    findUnpaidJobsByContractor,
    findUnpaidJobsByClient,
    findOneByid,
    payJob
}