class Mutex {
    lock() {
        if (this.unlock) {
            throw new Error(`Already locked`)
        }

        return new Promise((resolve) => {
            this.unlock = () => {
                delete this.unlock

                resolve()
            }
        })
    }
}

module.exports = { Mutex }
