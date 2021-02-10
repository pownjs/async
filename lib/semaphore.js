class Semaphore {
    constructor(rooms = 10) {
        this.rooms = Math.max(rooms, 1)

        this.count = 0
        this.queue = []
        this.eueuq = []

        this.next = this.next.bind(this)
    }

    get free() {
        return this.count < this.rooms
    }

    get busy() {
        return !this.free
    }

    next() {
        this.count -= 1

        const next = this.queue.shift()

        if (next) {
            next()
        }

        if (this.count === 0) {
            this.eueuq.forEach(f => f())

            this.eueuq = []
        }
    }

    async acquire() {
        if (this.busy) {
            await new Promise((resolve) => this.queue.push(resolve))
        }

        this.count += 1

        let released = false

        return async(promise) => {
            if (released) {
                throw new Error(`Already released`)
            }

            released = true

            if (promise) {
                await promise.finally(this.next)
            }
            else {
                this.next()
            }
        }
    }

    async join() {
        await new Promise((resolve) => {
            this.eueuq.push(resolve)
        })
    }
}

module.exports = { Semaphore }
