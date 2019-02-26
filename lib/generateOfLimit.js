const generateOfLimit = async function*(iterables, limit) {
    for await (const iterable of iterables) {
        for await (const item of iterable) {
            yield item
        }
    }
}

module.exports = { generateOfLimit }
