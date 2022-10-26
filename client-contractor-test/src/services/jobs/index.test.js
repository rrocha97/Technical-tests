'use strict'
const sinon = require('sinon')
const { assert } = sinon
const Profile = require('../../repositories/profiles')
const Job = require('../../repositories/jobs')
const jobService = require('.')
const { ProfileTypes } = require('../../constants')


let mocks = {}
let profilemockData = {
    id: 1,
    firstName: 'Harry',
    lastName: 'Potter',
    profession: 'Wizard',
    balance: 150,
    type: 'client',
}
let jobmockData = {
    id: 2,
    description: 'work',
    price: 210,
    paid: true,
    paymentDate: '2020-08-10T19:11:26.737Z',
    ContractId: 1,
    Contract: {
        ClientId: 2
    }
}
describe('calling job services', () => {
    describe('when calls to payJob', () => {
        beforeEach(() => {
            mocks.ProfilefindOneByid = sinon.stub(Profile, 'findOneByid').returns(profilemockData)
            mocks.ProfileUpdateBalance = sinon.stub(Profile, 'updateBalance').returns()
            mocks.JobfindOneByid = sinon.stub(Job, 'findOneByid').returns(jobmockData)
        })
        afterEach(() => {
            mocks.ProfilefindOneByid.restore()
            mocks.JobfindOneByid.restore()
            mocks.ProfileUpdateBalance.restore()
        })
        it('should throw error if jobId is empty', async () => {
            try {
                await jobService.payJob(profilemockData)
                assert.match(false, true)
            } catch (error) {
                assert.match(error, "id cannot be empty")
            }
        });

        it('should throw error if job does not exist', async () => {
            try {
                mocks.JobfindOneByid.returns()
                await jobService.payJob(profilemockData, 2)
                assert.match(false, true)
            } catch (error) {
                assert.match(error, "this job does not exist")
            }
        });
        it('should throw error if this job was already paid', async () => {
            try {
                await jobService.payJob(profilemockData, 2)
                assert.match(false, true)
            } catch (error) {
                assert.match(error, "this job was already paid")
            }
        });
        it('should throw error if this job does not belongs to this client', async () => {
            try {
                jobmockData.paid = false
                await jobService.payJob(profilemockData, 2)
                assert.match(false, true)
            } catch (error) {
                assert.match(error, "this job does not belongs to this client")
            }
        })
        it('should throw error if the client cannnot afford this job', async () => {
            try {
                jobmockData.Contract.ClientId = profilemockData.id
                await jobService.payJob(profilemockData, 2)
                assert.match(false, true)
            } catch (error) {
                assert.match(error, "the client cannnot afford this job")
            }
        });
        it('should call twice updateBalance', async () => {
            jobmockData.price = 10
            let result = await jobService.payJob(profilemockData, 2)
            assert.calledTwice(mocks.ProfileUpdateBalance)
            assert.match(result, `${profilemockData.id} has paid the job ${2}`)
        })
    })
    describe('when calls to getUnpaidJobsByProfile', () => {
        beforeEach(() => {
            mocks.JobfindUnpaidJobsByClient = sinon.stub(Job, 'findUnpaidJobsByClient').returns(jobmockData)
            mocks.JobfindUnpaidJobsByContractor = sinon.stub(Job, 'findUnpaidJobsByContractor').returns(jobmockData)
        })
        afterEach(() => {
            mocks.JobfindUnpaidJobsByClient.restore()
            mocks.JobfindUnpaidJobsByContractor.restore()
        })
        it('should call to findUnpaidJobsByClient if the profile is client', async () => {
            profilemockData.type = ProfileTypes.CLIENT
            await jobService.getUnpaidJobsByProfile(profilemockData)
            assert.calledOnce(mocks.JobfindUnpaidJobsByClient)
            assert.notCalled(mocks.JobfindUnpaidJobsByContractor)
        })
        it('should call to findUnpaidJobsByContractor if the profile is CONTRACTOR', async () => {
            profilemockData.type = ProfileTypes.CONTRACTOR
            await jobService.getUnpaidJobsByProfile(profilemockData)
            assert.notCalled(mocks.JobfindUnpaidJobsByClient)
            assert.calledOnce(mocks.JobfindUnpaidJobsByContractor)
        })
    })
})