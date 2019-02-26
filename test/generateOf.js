const assert = require('assert')

const { generateOf } = require('../lib/generateOf')

describe('generateOf', () => {
    it('produces the correct sequence of numbers', async() => {
        const generators = [
            [0],
            [1],
            [2]
        ]

        const items = []

        for await (const item of generateOf(generators)) {
            items.push(item)
        }

        assert.ok(items[0] === 0, 'item 0 is 0')
        assert.ok(items[1] === 1, 'item 1 is 1')
        assert.ok(items[2] === 2, 'item 2 is 2')
    })
})
