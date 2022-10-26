const admins = require('../../services/admins')
const Response = require('../../helpers/responseParser')


const getBestProfessionReport = async (req, res) => {
    let response = new Response('', 200)
    try {
        const { start, end } = req.query
        response.message = await admins.bestProfessionReport(start, end)
    } catch (error) {
        console.error(error)
        response = new Response(error, 500)
    }
    res.status(response.status).json(response.message).end()
}

const getBestClientsReport = async (req, res) => {
    let response = new Response('', 200)
    try {
        const { start, end, limit = 2 } = req.query
        response.message = await admins.bestClientsReport(start, end, limit)
    } catch (error) {
        console.error(error)
        response = new Response(error, 500)
    }
    res.status(response.status).json(response.message).end()
}



module.exports = {
    getBestProfessionReport,
    getBestClientsReport


}