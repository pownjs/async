const { Semaphore } = require('./semaphor')

class Mutex extends Semaphore {
    constructor() {
        super(1)
    }
}

module.exports = { Mutex }
