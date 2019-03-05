const { PassThrough } = require('stream')

const iterateOverEmitter = async function*(emitter, { yieldEvent, errorEvent = 'error', doneEvent = 'end' }) {
    const stream = new PassThrough({ objectMode: true })

    const yieldEventHandler = (i) => {
        stream.write(i)
    }

    const errorEventHandler = (e) => {
        stream.emit('error', e)
    }

    const doneEventHandler = () => {
        emitter.removeListener(yieldEvent, yieldEventHandler)
        emitter.removeListener(errorEvent, errorEventHandler)
        emitter.removeListener(doneEvent, doneEventHandler)

        stream.end()
    }

    emitter.addListener(yieldEvent, yieldEventHandler)
    emitter.addListener(errorEvent, errorEventHandler)
    emitter.addListener(doneEvent, doneEventHandler)

    for await (const chunk of stream) {
        yield chunk
    }
}

module.exports = { iterateOverEmitter }
