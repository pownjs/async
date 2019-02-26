const generateOf = async function*(iterables) {
    for await (const iterable of iterables) {
        for await (const item of iterable) {
            yield item
        }
    }
}

module.exports = { generateOf }
