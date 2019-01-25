const assert = require('assert')

const { sleep } = require('../lib/timers')
const { eachOfLimit } = require('../lib/eachOfLimit')

describe('eachOfLimit', () => {
    it('fetches 1 at the time', async() => {
        const items = []

        await eachOfLimit([0, 1, 2], 1, async(item) => {
            await sleep(300)

            return items.push(item)
        })

        assert.ok(items[0] === 0, 'item 0 is 0')
        assert.ok(items[1] === 1, 'item 1 is 1')
        assert.ok(items[2] === 2, 'item 2 is 2')
    }).timeout(1000)
})
