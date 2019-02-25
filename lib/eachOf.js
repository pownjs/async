const eachOf = async(iterable, handler) => {
    for await (const item of iterable) {
        await handler(item)
    }
}

module.exports = { eachOf }
