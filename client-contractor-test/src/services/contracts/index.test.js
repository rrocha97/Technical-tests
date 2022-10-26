'use strict'
const sinon = require('sinon')
const { assert } = sinon
const contract = require('../../repositories/contracts')
const contractService = require('.')
const { ProfileTypes } = require('../../constants')


let mocks = {}
let contractMockData = {
    id: 5,
    terms: 'bla bla bla',
    status: 'new',
    ClientId: 3,
    ContractorId: 8,
}
let profilemockData = {
    id: 1,
    firstName: 'Harry',
    lastName: 'Potter',
    profession: 'Wizard',
    balance: 1150,
    type: 'client',
}
describe('calling contract services', () => {
    describe('when call findProfileByid', () => {
        beforeEach(() => {
            mocks.findOneByid = sinon.stub(contract, 'findOneByid').returns(contractMockData)
        })
        afterEach(() => {
            mocks.findOneByid.restore()
        })
        it('should throw error if id is empty', async () => {
            try {
                await contractService.getContractById()
            } catch (error) {
                assert.match(error, "id cannot be empty")
            }
        });
        it('should call to findOneByid once', async () => {
            mocks.findOneByid.returns(contractMockData)
            let profile = await contractService.getContractById(1)
            assert.calledOnce(mocks.findOneByid)
            assert.match(profile, contractMockData)
        })

    })
    describe('when call getProfileContracts', () => {
        beforeEach(() => {
            mocks.findByClient = sinon.stub(contract, 'findByClient').returns(contractMockData)
            mocks.findByContractor = sinon.stub(contract, 'findByContractor').returns(contractMockData)
        })
        afterEach(() => {
            mocks.findByClient.restore()
            mocks.findByContractor.restore()
        })
        it('should call to findByClient if the profile is client', async () => {
            profilemockData.type = ProfileTypes.CLIENT
            await contractService.getProfileContracts(profilemockData)
            assert.calledOnce(mocks.findByClient)
            assert.notCalled(mocks.findByContractor)
        })
        it('should call to findByContractor if the profile is CONTRACTOR', async () => {
            profilemockData.type = ProfileTypes.CONTRACTOR
            await contractService.getProfileContracts(profilemockData)
            assert.notCalled(mocks.findByClient)
            assert.calledOnce(mocks.findByContractor)
        })
    })
})