const { Profile, Contract, Job } = require('../../model')
const { ProfileTypes } = require('../../constants')
const { Op } = require("sequelize");

const professionJobs = async (start, end) => {
    return await Profile.findAll({
        include: [{
            model: Contract,
            as: 'Contractor',
            required: true,
            attributes: ['id'],
            include: [{
                model: Job,
                required: true,
                attributes: ['id', 'price'],
                where: {
                    paid: true, createdAt: {
                        [Op.lte]: new Date(end),
                        [Op.gte]: new Date(start)
                    }
                },
            }]
        }],
        attributes: ['id', 'profession'],
        where: { type: ProfileTypes.CONTRACTOR }
    })
}

const bestClientsReport = async (start, end) => {
    return await Profile.findAll({
        include: [{
            model: Contract,
            as: 'Client',
            required: true,
            attributes: ['id'],
            include: [{
                model: Job,
                required: true,
                attributes: ['id', 'price'],
                where: {
                    paid: true, createdAt: {
                        [Op.lte]: new Date(end),
                        [Op.gte]: new Date(start)
                    }
                },
            }]
        }],
        attributes: ['id', 'firstName', 'lastName'],
        where: { type: ProfileTypes.CLIENT }
    })
}

module.exports = {
    professionJobs,
    bestClientsReport
}