const { setImmediate, setTimeout } = require('timers')

const idle = (value) => {
    return new Promise((resolve) => {
        setImmediate(() => {
            resolve(value)
        })
    })
}

const sleep = (milliseconds, value) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(value)
        }, milliseconds)
    })
}


module.exports = { idle, sleep }
