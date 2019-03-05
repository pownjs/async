const iterateOverStream = async function*(stream) {
    for await (const chunk of stream) {
        yield chunk
    }
}

module.exports = { iterateOverStream }
