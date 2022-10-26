const contract = require('../../services/contracts')
const Response = require('../../helpers/responseParser')


const getContract = async (req, res) => {
    let response = new Response('', 200)
    try {
        const { id } = req.params
        response.message = await contract.getContractById(id)
        if (!response.message) {
            response = new Response('Contract not found', 404)
        }
    } catch (error) {
        console.error(error)
        response = new Response(error, 500)
    }
    res.status(response.status).json(response.message).end()
}

const getContracts = async (req, res) => {
    let response = new Response('', 200)
    try {
        response.message = await contract.getProfileContracts(req.profile)
        if (!response.message.length === 0) {
            response = new Response('Contracts not found', 404)
        }
    } catch (error) {
        console.error(error)
        response = new Response(error, 500)
    }
    res.status(response.status).json(response.message).end()
}




module.exports = {
    getContract,
    getContracts


}