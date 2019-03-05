const iterateOverStreamInternal = async function*(stream) {
    for await (const chunk of stream) {
        yield chunk
    }
}

const iterateOverStream = (...args) => {
    return {
        [Symbol.asyncIterator]() {
            return iterateOverStreamInternal(...args)
        }
    }
}

module.exports = { iterateOverStream }
