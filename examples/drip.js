const { drip } = require('../lib/drip')
const { sleep } = require('../lib/sleep')

const main = async() => {
    const concurency = 5

    const generator = async function*() {
        let i = 1

        for await (let item of drip()) {
            yield i++
        }
    }

    await Promise.all(Array(concurency).fill(generator()).map(async(generator) => {
        for await (let item of generator) {
            console.log(`processing item`, item)

            if (item % concurency == 0) {
                console.log('---')
            }

            await sleep(1000)
        }
    }))
}

main()
