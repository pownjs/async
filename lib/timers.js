console.warn('WARNING: deprecated, use idle.js and sleep.js instead')

const { idle } = require('./idle')
const { sleep } = require('./sleep')

module.exports = { idle, sleep }
