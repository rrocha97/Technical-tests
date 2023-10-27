const { Tracker } = require('./Tracker');

class NonSilentTracker extends Tracker {

    constructor() {
        super();
        this.hosts = {}

    }

    avaliableServer(name) {
        return !this.hosts[name] ? true : false
    }

    allocate(hostType) {
        console.log(hostType)

        let server = 1
        let isServerAvailable = false
        let hostName
        while (isServerAvailable === false) {
            hostName = `${hostType}${server}`
            isServerAvailable = this.avaliableServer(hostName)
        }
        this.hosts[hostName] = true
        console.log(hostName)
        return hostName;
    }

    deallocate(hostName) {
        if (this.avaliableServer(hostName)) {
            delete this.hosts[hostName]
        } else {
            console.error("Invalid operation")
            throw ("Invalid operation")
        }
        return ""
    }
}

module.exports = { NonSilentTracker };
