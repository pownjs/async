function isIterable(obj) {
    if (!obj) {
        return false
    }

    return typeof(obj[Symbol.iterator]) === 'function' || typeof(obj[Symbol.asyncIterator]) === 'function'
}

function isSyncIterable(obj) {
    if (!obj) {
        return false
    }

    return typeof(obj[Symbol.asyncIterator]) === 'function'
}

function isAsyncIterable(obj) {
    if (!obj) {
        return false
    }

    return typeof(obj[Symbol.asyncIterator]) === 'function'
}

module.exports = { isIterable, isSyncIterable, isAsyncIterable }
