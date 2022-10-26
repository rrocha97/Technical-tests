'use strict'
const sinon = require('sinon')
const { assert } = sinon
const Profile = require('../../repositories/profiles')
const profileService = require('.')

let mocks = {}
let profilemockData = {
    id: 1,
    firstName: 'Harry',
    lastName: 'Potter',
    profession: 'Wizard',
    balance: 1150,
    type: 'client',
}
describe('calling profile services', () => {
    describe('when call findProfileByid', () => {
        beforeEach(() => {
            mocks.findOneByid = sinon.stub(Profile, 'findOneByid').returns('')
        })
        afterEach(() => {
            mocks.findOneByid.restore()
        })
        it('should throw error if profileId is empty', async () => {
            try {
                await profileService.findProfileByid()
            } catch (error) {
                assert.calledOnce(mocks.findOneByid)
                assert.match(error, "this profile does not exist")
            }
        });
        it('should call to findOneByid once', async () => {
            mocks.findOneByid.returns(profilemockData)
            let profile = await profileService.findProfileByid(1)
            assert.calledOnce(mocks.findOneByid)
            assert.match(profile, profilemockData)
        })

    })
})