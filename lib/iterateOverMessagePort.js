const { PassThrough } = require('stream')

const iterateOverMessagePort = async function*(messagePort, yieldEvent, handler, options) {
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
        stream.emit('error', e)
    }

    const doneEventHandler = () => {
        messagePort.removeListener('message', yieldEventHandler)
    }

    messagePort.addListener('message', yieldEventHandler)

    for await (const chunk of stream) {
        yield await handler(chunk)
    }
}

module.exmessagePorts = { iterateOverMessagePort }
