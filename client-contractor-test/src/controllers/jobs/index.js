const job = require('../../services/jobs')
const Response = require('../../helpers/responseParser')


const postPayJob = async (req, res) => {
    let response = new Response('', 200)
    try {
        const { job_id } = req.params
        response.message = await job.payJob(req.profile, job_id)
        if (!response.message) {
            response = new Response('job not found', 404)
        }
    } catch (error) {
        console.error(error)
        response = new Response(error, 400)
    }
    res.status(response.status).json(response.message).end()
}

const getUnpaidJobs = async (req, res) => {
    let response = new Response('', 200)
    try {
        response.message = await job.getUnpaidJobsByProfile(req.profile)
        if (response.message.length === 0) {
            response = new Response('jobs not found', 404)
        }
    } catch (error) {
        console.error(error)
        response = new Response(error, 500)
    }
    res.status(response.status).json(response.message).end()
}




module.exports = {
    postPayJob,
    getUnpaidJobs


}