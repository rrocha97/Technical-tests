const Admin = require('../../repositories/admins')


const calculateProfessionTotalEarn = (profileJobs) => {
    let professionsJobs = {}
    for (const profile of profileJobs) {
        professionsJobs[profile.profession] = professionsJobs[profile.profession] || 0
        professionsJobs[profile.profession] += addUpJobsEarn(profile.Contractor)
    }
    return professionsJobs
}
const addUpJobsEarn = (contractors) => {
    let TotalJobEarn = 0
    for (const Contractor of contractors) {
        TotalJobEarn += Contractor.Jobs.reduce((a, b) => { return a + b.price }, 0)
    }
    return TotalJobEarn
}
const orderbyMaxTotal = (professionTotalEarn) => {
    professionTotalEarn.sort((a, b) => {
        if (a[1] < b[1]) {
            return 1;

        } if (a[1] > b[1]) {
            return -1;
        }
        return 0;
    })
    return professionTotalEarn.reduce((a, b) => {
        return Object.assign(a, {
            [b[0]]: b[1]
        })
    }, {})
}

const bestProfessionReport = async (start, end) => {
    let profileJobs = await Admin.professionJobs(start, end);
    let professionTotalEarn = calculateProfessionTotalEarn(profileJobs)
    professionTotalEarn = Object.entries(professionTotalEarn)
    professionTotalEarn = orderbyMaxTotal(professionTotalEarn)
    return professionTotalEarn
}


const bestClientsReport = async (start, end, limit = 2) => {
    let profileJobs = await Admin.bestClientsReport(start, end);
    let bestClients = calculateClientTotalPaid(profileJobs)
    orderbyMaxTotalPaid(bestClients)
    return bestClients.slice(0, limit)
}

const orderbyMaxTotalPaid = (bestClients) => {
    bestClients.sort((a, b) => {
        if (a.paid < b.paid) {
            return 1;

        } if (a.paid > b.paid) {
            return -1;
        }
        return 0;
    })
}

const parseClientResponse = (profile) => {
    return {
        id: profile.id,
        fullName: `${profile.firstName} ${profile.lastName} `,
        paid: addUpJobsEarn(profile.Client)
    }

}

const calculateClientTotalPaid = (profileJobs) => {
    let bestClients = []
    for (const profile of profileJobs) {
        let client = parseClientResponse(profile)
        bestClients.push(client)
    }
    return bestClients
}


module.exports = {
    bestProfessionReport,
    bestClientsReport
}