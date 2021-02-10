const { drip } = require('./drip')
const { Mutex } = require('./mutex')

class Semaphore {
    constructor(rooms = 10) {
        this.drip = drip(rooms)
        this.muts = new Set()
    }

    async acquire() {
        const { value: release, done } = await this.drip.next()

        if (done) {
            throw new Error(`Unexpected state`)
        }

        const mut = new Mutex()

        this.muts.add(mut.lock())

        return async(promise) => {
            await release(promise)
            await mut.unlock()

            this.muts.delete(mut)
        }
    }

    async join() {
        while (true) {
            await Promise.all(Array.from(this.muts.values()))

            if (!this.muts.length) {
                break
            }
        }
    }
}

module.exports = { Semaphore }
