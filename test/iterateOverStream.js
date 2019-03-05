const assert = require('assert')
const { PassThrough } = require('stream')

const { iterateOverStream } = require('../lib/iterateOverStream')

describe('iterateOverStream', () => {
    it('produces the correct numbers', async() => {
        const stream = new PassThrough({ objectMode: true })

        setTimeout(() => {
            stream.write(0)
            stream.write(1)
            stream.write(2)
            stream.end()
        }, 1)

        const items = []

        for await (const item of iterateOverStream(stream)) {
            items.push(item)
        }

        items.sort()

        assert.deepEqual(items, [0, 1, 2], 'items are 0, 1, 2')
    })
})
