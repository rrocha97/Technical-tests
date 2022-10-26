module.exports = {
    setupFilesAfrerEnvs: ['./setupTest.js'],
    verbose: true,
    "testEnvironment": "node",
    "testPathIgnorePatterns": [
        "<rootDir>/(lib|build|docs|node_modules)/"
    ],
    "coveragePathIgnorePatterns": [
        "<rootDir>/server/index.js"
    ]
}