const { ContractStatus, ProfileTypes } = require('../../constants')
const Job = require('../../repositories/jobs')
const Profile = require('../../repositories/profiles')

const verifiedJob = async (jobId, idClient) => {
    if (!jobId) {
        throw ('id cannot be empty')
    }
    let job = await findJob(jobId)
    isJobNeedPaid(job)
    isclientJob(job, idClient)
    return job
}

const findJob = async (jobId) => {
    let job = await Job.findOneByid(jobId);
    if (!job) {
        throw ('this job does not exist')
    }
    return job
}

const isclientJob = (job, idClient) => {
    if (job.Contract?.ClientId !== idClient) {
        throw ('this job does not belongs to this job')
    }
}
const isJobNeedPaid = (job) => {
    if (job.paid) {
        throw ('this job was already paid')
    }
}

const payJob = async (profile, jobid) => {
    let job = await verifiedJob(jobid, profile.id)

    if (profile.balance <= job.price) {
        throw ('the client cannnot afford this job')
    }
    await Job.payJob(jobid)
    await Profile.updateBalance(job.Contract?.ClientId, -job.price)
    await Profile.updateBalance(job.Contract?.ContractorId, job.price)
    return `${profile.id} has paid the job ${job.id}`
}



const getUnpaidJobsByProfile = async (profile) => {
    let jobs;
    if (profile.type === ProfileTypes.CLIENT) {
        jobs = await Job.findUnpaidJobsByClient(profile.id, [ContractStatus.IN_PROGRESS])
    }
    else if (profile.type === ProfileTypes.CONTRACTOR) {
        jobs = await Job.findUnpaidJobsByContractor(profile.id, [ContractStatus.IN_PROGRESS])
    }
    return jobs
}




module.exports = {
    getUnpaidJobsByProfile,
    payJob

}