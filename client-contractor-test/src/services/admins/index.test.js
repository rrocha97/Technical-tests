'use strict'
const sinon = require('sinon')
const { assert } = sinon
const Admin = require('../../repositories/admins')
const adminService = require('.')


let mocks = {}
let professionJobs = [
    {
        "id": 6,
        "profession": "Programmer",
        "Contractor": [
            {
                "id": 2,
                "Jobs": [
                    {
                        "id": 2,
                        "price": 201
                    },
                    {
                        "id": 7,
                        "price": 200
                    },
                    {
                        "id": 12,
                        "price": 21
                    }
                ]
            },
            {
                "id": 3,
                "Jobs": [
                    {
                        "id": 8,
                        "price": 200
                    },
                    {
                        "id": 13,
                        "price": 121
                    },
                    {
                        "id": 14,
                        "price": 121
                    }
                ]
            }
        ]
    },
    {
        "id": 7,
        "profession": "Programmer",
        "Contractor": [
            {
                "id": 7,
                "Jobs": [
                    {
                        "id": 6,
                        "price": 2020
                    }
                ]
            }
        ]
    },
    {
        "id": 5,
        "profession": "Musician",
        "Contractor": [
            {
                "id": 1,
                "Jobs": [
                    {
                        "id": 9,
                        "price": 200
                    },
                    {
                        "id": 11,
                        "price": 21
                    }
                ]
            }
        ]
    },
    {
        "id": 8,
        "profession": "Fighter",
        "Contractor": [
            {
                "id": 5,
                "Jobs": [
                    {
                        "id": 10,
                        "price": 200
                    }
                ]
            }
        ]
    }
]

let bestClientsReport = [
    {
        "id": 1,
        "firstName": "Harry",
        "lastName": "Potter",
        "Client": [
            {
                "id": 2,
                "Jobs": [
                    {
                        "id": 2,
                        "price": 201
                    },
                    {
                        "id": 7,
                        "price": 200
                    },
                    {
                        "id": 12,
                        "price": 21
                    }
                ]
            },
            {
                "id": 1,
                "Jobs": [
                    {
                        "id": 9,
                        "price": 200
                    },
                    {
                        "id": 11,
                        "price": 21
                    }
                ]
            }
        ]
    },
    {
        "id": 4,
        "firstName": "Ash",
        "lastName": "Kethcum",
        "Client": [
            {
                "id": 7,
                "Jobs": [
                    {
                        "id": 6,
                        "price": 2020
                    }
                ]
            }
        ]
    },
    {
        "id": 2,
        "firstName": "Mr",
        "lastName": "Robot",
        "Client": [
            {
                "id": 3,
                "Jobs": [
                    {
                        "id": 8,
                        "price": 200
                    },
                    {
                        "id": 13,
                        "price": 121
                    },
                    {
                        "id": 14,
                        "price": 121
                    }
                ]
            }
        ]
    },
    {
        "id": 3,
        "firstName": "John",
        "lastName": "Snow",
        "Client": [
            {
                "id": 5,
                "Jobs": [
                    {
                        "id": 10,
                        "price": 200
                    }
                ]
            }
        ]
    }
]

let responseProfessionTotalEarn = {
    "Programmer": 2884,
    "Musician": 221,
    "Fighter": 200
}


let responseBestClients = [
    {
        "id": 4,
        "fullName": "Ash Kethcum ",
        "paid": 2020
    },
    {
        "id": 1,
        "fullName": "Harry Potter ",
        "paid": 643
    },
    {
        "id": 2,
        "fullName": "Mr Robot ",
        "paid": 442
    }
]
describe('calling admin services', () => {
    describe('when calls to bestProfessionReport', () => {
        beforeEach(() => {
            mocks.professionJobs = sinon.stub(Admin, 'professionJobs').returns(professionJobs)
        })
        afterEach(() => {
            mocks.professionJobs.restore()
        })

        it('should return a correct report', async () => {
            let result = await adminService.bestProfessionReport(new Date(), new Date())
            assert.match(result, responseProfessionTotalEarn)
        })
    })
    describe('when calls to bestClientsReport', () => {
        beforeEach(() => {
            mocks.bestClientsReport = sinon.stub(Admin, 'bestClientsReport').returns(bestClientsReport)
        })
        afterEach(() => {
            mocks.bestClientsReport.restore()
        })

        it('should return a correct report limit 3', async () => {
            let result = await adminService.bestClientsReport(new Date(), new Date(), 3)
            assert.match(result, responseBestClients)
            assert.match(result.length, 3)
        })
        it('should return a correct report limit 2 by default', async () => {
            let result = await adminService.bestClientsReport(new Date(), new Date())
            assert.match(result.length, 2)
            assert.match(result, responseBestClients.slice(0, 2))

        })
    })
})