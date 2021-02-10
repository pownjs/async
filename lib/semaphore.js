class Semaphore {
    constructor(rooms = 10) {
        this.rooms = Math.max(rooms, 1)

        this.count = 0
        this.queue = []
        this.eueuq = []
    }

    get full() {
        return this.count === this.rooms
    }

    get empty() {
        return this.count === 0
    }

    get free() {
        return this.count < this.rooms
    }

    get busy() {
        return !this.free
    }

    async acquire() {
        if (this.busy) {
            await new Promise(resolve => this.queue.push(resolve))
        }

        this.count += 1

        let released = false

        return async(promise) => {
            if (released) {
                throw new Error(`Already released`)
            }

            released = true

            if (promise) {
                await promise.finally(() => {
                    const next = this.queue.shift()

                    if (next) {
                        next()
                    }
                })
            }
            else {
                const next = this.queue.shift()

                if (next) {
                    next()
                }
            }

            this.count -= 1

            if (this.empty) {
                this.eueuq.forEach(f => f())

                this.eueuq = []
            }
        }
    }

    async join() {
        if (this.busy) {
            await new Promise(resolve => this.eueuq.push(resolve))
        }
    }
}

module.exports = { Semaphore }
