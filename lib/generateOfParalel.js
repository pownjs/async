const convert = async function*(iterable) {
    for await (const item of iterable) {
        yield item
    }
}

const handler = async function(iterable, index) {
    const { value, done } = await iterable.next()

    return { value, done, iterable, index }
}

const generateOfParalel = async function*(iterables) {
    const promises = {}

    for await (const iterable of iterables) {
        const index = Symbol()

        promises[index] = handler(convert(iterable), index)
    }

    while (true) {
        const runners = Object.getOwnPropertySymbols(promises).map(s => promises[s])

        if (!runners.length) {
            return
        }

        const { value, done, iterable, index } = await Promise.race(runners)

        if (done) {
            if (value !== undefined) {
                yield value
            }

            delete promises[index]
        }
        else {
            yield value

            promises[index] = handler(iterable, index)
        }
    }
}

module.exports = { generateOfParalel }