const drip = async function*(concurrency = 1, limit = Infinity) {
    const tasks = new Set()

    while (limit -= 1) {
        const promises = Array.from(tasks.values())

        if (promises.length < concurrency) {
            const release = async(promise) => {
                if (promise) {
                    try {
                        await promise
                    }
                    catch (e) {}
                }
            }

            tasks.add(release)

            yield release
        }
        else {
            const release = await Promise.race(promises)

            tasks.delete(release)
        }
    }
}

module.exports = { drip }
