const express = require('express')
const router = express.Router()
const { getProfile } = require('./middleware/getProfile')
const { contractsController, jobController, balancesController, adminController } = require('./controllers')


router.get('/', async (req, res) => {
    res.json({ message: "hello world" })
    res.status(200).end()
})

router.use(getProfile)
router.get('/contracts/:id', contractsController.getContract)
router.get('/contracts/', contractsController.getContracts)
router.get('/jobs/unpaid', jobController.getUnpaidJobs)
router.post('/jobs/:job_id/pay', jobController.postPayJob)
router.post('/balances/deposit/:userId', balancesController.postDeposit)
router.get('/admin/best-profession', adminController.getBestProfessionReport)
router.get('/admin/best-clients', adminController.getBestClientsReport)


module.exports = router