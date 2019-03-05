const assert = require('assert')

const { idle, sleep } = require('../lib/timers')

describe('timers', () => {
    describe('#idle', () => {
        it('sleeps', async() => {
            await idle()
            await idle()
            await idle()

            assert.ok(true, 'done')
        }).timeout(1000)
    })

    describe('#sleep', () => {
        it('sleeps', async() => {
            await sleep(300)
            await sleep(300)
            await sleep(300)

            assert.ok(true, 'done')
        }).timeout(1000)
    })
})
