const assert = require('assert')

const { sleep } = require('../lib/timers')
const { Semaphore } = require('../lib/semaphore')

describe('semaphore', () => {
    describe('#acquire', () => {
        it('it acquires at 1 room', async() => {
            const semaphore = new Semaphore()

            assert.ok(semaphore.rooms === 1, 'at least 1 room allocated')

            const r1 = await semaphore.acquire()

            r1()

            const r2 = await semaphore.acquire()

            r2()

            const r3 = await semaphore.acquire()

            r3()

            assert.ok(true, 'done')
        })
    })

    describe('#acquire', () => {
        it('it acquires at 1 room with release promises', async() => {
            const semaphore = new Semaphore()

            assert.ok(semaphore.rooms === 1, 'at least 1 room allocated')

            const r1 = await semaphore.acquire()

            r1(sleep(300))

            const r2 = await semaphore.acquire()

            r2(sleep(300))

            const r3 = await semaphore.acquire()

            r3(sleep(300))

            assert.ok(true, 'done')
        })
    })
})
