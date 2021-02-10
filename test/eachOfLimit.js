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

        assert.equal(items.length, 3, 'items.length is correct value')
        assert.equal(items[0], 0, 'items[0] is correct value')
        assert.equal(items[1], 1, 'items[1] is correct value')
        assert.equal(items[2], 2, 'itesm[2] is correct value')
    }).timeout(1000)

    it('fetches all at the same time', async() => {
        const items = []

        await eachOfLimit([0, 1, 2], 3, async(item) => {
            await sleep((3 - item) * 100)

            items.push(item)
        })

        assert.equal(items.length, 3, 'items.length is correct value')
    }).timeout(1000)

    it('fetch tests', async() => {
        const items = []

        await eachOfLimit([0], 1, async(item) => {
            await sleep(100)

            items.push(item)
        })

        assert.equal(items.length, 1, 'items.length is correct value')
        assert.equal(items[0], 0, 'items[0] is correct value')

        await eachOfLimit([1], 2, async(item) => {
            await sleep(100)

            items.push(item)
        })

        assert.equal(items.length, 2, 'items.length is correct value')
        assert.equal(items[1], 1, 'items[2] is correct value')
    }).timeout(1000)
})
