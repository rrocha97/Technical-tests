const { NonSilentTracker } = require('./NonSilentTracker')

const start = () => {
    const traker = new NonSilentTracker()
    traker.allocate('api')
    traker.allocate('api')
    traker.allocate('api')
    console.log(traker.hosts);
    traker.deallocate('api2')
    console.log(traker.hosts);
    traker.allocate('api')
    console.log(traker.hosts);

}

start()