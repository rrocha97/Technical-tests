'use strict'
const sinon = require('sinon')
const { assert } = sinon
const Profile = require('../../repositories/profiles')
const Jobs = require('../../services/jobs')
const ProfileService = require('../../services/profiles')
const balanceService = require('.')


let mocks = {}
let profilemockData = {
    id: 1,
    firstName: 'Harry',
    lastName: 'Potter',
    profession: 'Wizard',
    balance: 150,
    type: 'client',
}
let unpaidJobsByProfile = [
    {
        "id": 4,
        "description": "work",
        "price": 200,
        "paid": null,
        "paymentDate": null,
        "createdAt": "2022-10-25T01:48:37.343Z",
        "updatedAt": "2022-10-25T01:48:37.343Z",
        "ContractId": 4,
        "Contract": {
            "id": 4,
            "terms": "bla bla bla",
            "status": "in_progress",
            "createdAt": "2022-10-25T01:48:37.342Z",
            "updatedAt": "2022-10-25T01:48:37.342Z",
            "ContractorId": 7,
            "ClientId": 2
        }
    },
    {
        "id": 3,
        "description": "work",
        "price": 200,
        "paid": null,
        "paymentDate": null,
        "createdAt": "2022-10-25T01:48:37.343Z",
        "updatedAt": "2022-10-25T01:48:37.343Z",
        "ContractId": 4,
        "Contract": {
            "id": 4,
            "terms": "bla bla bla",
            "status": "in_progress",
            "createdAt": "2022-10-25T01:48:37.342Z",
            "updatedAt": "2022-10-25T01:48:37.342Z",
            "ContractorId": 7,
            "ClientId": 2
        }
    }
]
describe('calling balance services', () => {
    describe('when calls to postDepositToClient', () => {
        beforeEach(() => {
            mocks.JobGetUnpaidJobsByProfile = sinon.stub(Jobs, 'getUnpaidJobsByProfile').returns(unpaidJobsByProfile)
            mocks.ProfilefindOneByid = sinon.stub(Profile, 'findOneByid').returns(profilemockData)
            mocks.ProfileUpdateBalance = sinon.stub(Profile, 'updateBalance').returns()
            mocks.ProfilefindProfileByid = sinon.stub(ProfileService, 'findProfileByid').returns(profilemockData)
        })
        afterEach(() => {
            mocks.ProfilefindOneByid.restore()
            mocks.ProfileUpdateBalance.restore()
            mocks.JobGetUnpaidJobsByProfile.restore()
            mocks.ProfilefindProfileByid.restore()
        })
        it('should throw error if money is less than 0', async () => {
            try {
                await balanceService.postDepositToClient(2, -1, profilemockData)
                assert.match(false, true)
            } catch (error) {
                assert.match(error, "money cannot be less than 0")
            }
        });

        it('should throw error if the money is more than 25% his total of jobs to pay', async () => {
            try {
                await balanceService.postDepositToClient(2, 200, profilemockData)
                assert.match(false, true)
            } catch (error) {
                assert.match(error, "client cannot deposit more than 25% his total of jobs to pay")
            }
        });
        it('should throw error if the client cannnot afford this job', async () => {
            try {
                profilemockData.balance = 9
                await balanceService.postDepositToClient(2, 10, profilemockData)
                assert.match(false, true)
            } catch (error) {
                assert.match(error, "the client cannot afford this deposit")
            }
        });
        it('should call twice updateBalance', async () => {
            profilemockData.balance = 900
            let result = await balanceService.postDepositToClient(2, 10, profilemockData)
            assert.calledTwice(mocks.ProfileUpdateBalance)
            assert.calledOnce(mocks.ProfilefindProfileByid)
            assert.match(result, `${profilemockData.id} made the deposit of 10 to 1`)
        })
    })
})