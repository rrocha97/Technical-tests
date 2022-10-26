const Balances = require('../../services/balances')
const Response = require('../../helpers/responseParser')


const postDeposit = async (req, res) => {
    let response = new Response('', 200)
    try {
        const { userId } = req.params
        const { money } = req.body
        response.message = await Balances.postDepositToClient(userId, money, req.profile)
        if (!response.message) {
            response = new Response('Contract not found', 404)
        }
    } catch (error) {
        console.error(error)
        response = new Response(error, 400)
    }
    res.status(response.status).json(response.message).end()
}





module.exports = {
    postDeposit
}