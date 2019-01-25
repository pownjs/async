const { Semaphore } = require('./semaphore')

const eachOfLimit = async(iterable, limit, handler) => {
    const semaphore = new Semaphore(limit)

    for await (const item of iterable) {
        const release = await semaphore.acquire()

        release(handler(item))
    }

    await semaphore.join()
}

module.exports = { eachOfLimit }
