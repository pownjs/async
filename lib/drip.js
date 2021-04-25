const { Mutex } = require('./mutex')

const drip = async function*(concurrency = 1, limit = 1) {
    const tasks = new Set()

    while ((limit -= 1)) {
        if (tasks.size < concurrency) {
            const mutex = new Mutex()

            const task = { promise: mutex.lock() }

            tasks.add(task)

            const release = async(promise) => {
                if (promise) {
                    await promise
                }

                await mutex.unlock(task)
            }

            yield release
        }
        else {
            const task = await Promise.race(tasks.values())

            tasks.delete(task)
        }
    }

    throw new Error(`Unexpected state`)
}

module.exports = { drip }
