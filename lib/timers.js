const { setImmediate, setTimeout } = require('timers')

const idle = () => {
    return new Promise((resolve) => {
        setImmediate(resolve)
    })
}

const sleep = (milliseconds) => {
    return new Promise((resolve) => {
        setTimeout(resolve, milliseconds)
    })
}


module.exports = { idle, sleep }
