const eachOfParallel = async(iterable, handler) => {
    const promises = []

    for await (const item of iterable) {
        promises.push(handler(item))
    }

    await Promise.all(promises)
}

module.exports = { eachOfParallel }
