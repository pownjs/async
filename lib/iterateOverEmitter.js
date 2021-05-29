const { PassThrough } = require('stream')

const iterateOverEmitter = async function*(emitter, yieldEvent, handler, options) {
    if (typeof(handler) !== 'function') {
        options = handler
        handler = undefined
    }

    const { errorEvent = 'error', doneEvent = 'end' } = options || {}

    if (!handler) {
        handler = chunk => chunk
    }

    const stream = new PassThrough({ objectMode: true })

    const yieldEventHandler = (i) => {
        stream.write(i)
    }

    const errorEventHandler = (e) => {
        emitter.off(yieldEvent, yieldEventHandler)
        emitter.off(errorEvent, errorEventHandler)
        emitter.off(doneEvent, doneEventHandler)

        stream.emit('error', e)
    }

    const doneEventHandler = () => {
        emitter.off(yieldEvent, yieldEventHandler)
        emitter.off(errorEvent, errorEventHandler)
        emitter.off(doneEvent, doneEventHandler)

        stream.end()
    }

    emitter.on(yieldEvent, yieldEventHandler)
    emitter.on(errorEvent, errorEventHandler)
    emitter.on(doneEvent, doneEventHandler)

    for await (const chunk of stream) {
        yield await handler(chunk)
    }
}

module.exports = { iterateOverEmitter }
