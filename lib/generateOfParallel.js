const { EventEmitter } = require('events')

const { isIterable } = require('./utils')
const { eachOfParallel } = require('./eachOfParallel')
const { iterateOverEmitter } = require('./iterateOverEmitter')

const generateOfParallel = async function*(iterables) {
    const ee = new EventEmitter()

    eachOfParallel(iterables, async(item) => {
        if (isIterable(item)) {
            for await (let subitem of generateOfParallel(item)) {
                ee.emit('item', subitem)
            }
        }
        else {
            ee.emit('item', item)
        }
    }).then(() => ee.emit('end')).catch((error) => ee.emit('error'))

    yield* iterateOverEmitter(ee, 'item')
}

module.exports = { generateOfParallel }
