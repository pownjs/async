const { sleep } = require('./timers')

const iterateOverEmitterInternal = (emitter, { yieldEvent, errorEvent = 'error', doneEvent = 'end' }) => {
    const items = []

    let error = null
    let done = false

    const yieldEventHandler = (i) => {
        items.push(i)
    }

    const errorEventHandler = (e) => {
        error = e
    }

    const doneEventHandler = () => {
        done = true

        emitter.removeListener(yieldEvent, yieldEventHandler)
        emitter.removeListener(errorEvent, errorEventHandler)
        emitter.removeListener(doneEvent, doneEventHandler)
    }

    emitter.addListener(yieldEvent, yieldEventHandler)
    emitter.addListener(errorEvent, errorEventHandler)
    emitter.addListener(doneEvent, doneEventHandler)

    return {
        next: () => {
            return new Promise(async(resolve, reject) => {
                while ((!error && !done) || items.length) {
                    if (items.length) {
                        resolve({ value: items.shift(), done: false })

                        return
                    }

                    await sleep(1)
                }

                if (error) {
                    reject(error)
                }
                else {
                    resolve({ value: undefined, done: true })
                }
            })
        }
    }
}

const iterateOverEmitter = (...args) => {
    return {
        [Symbol.asyncIterator]() {
            return iterateOverEmitterInternal(...args)
        }
    }
}

module.exports = { iterateOverEmitter }
