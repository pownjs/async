const assert = require('assert')

const { sleep } = require('../lib/timers')
const { eachOfLimit } = require('../lib/eachOfLimit')

describe('eachOfLimit', () => {
    it('fetches 1 at the time', async() => {
        const items = []

        await eachOfLimit([0, 1, 2], 1, async(item) => {
            await sleep((3 - item) * 100)

            items.push(item)
        })

        assert.equal(items.length, 3)
        assert.equal(items[0], 0)
        assert.equal(items[1], 1)
        assert.equal(items[2], 2)
    }).timeout(1000)
})
