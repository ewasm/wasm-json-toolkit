/**
 * converts a wasm binary into a json representation
 * @param {Buffer}
 * @return {Object}
 */
exports.wasm2json = require('./wasm2json.js')

/**
 * converts a json representation to a wasm binary
 * @param {Object}
 * @return {Buffer}
 */
exports.json2wasm = require('./json2wasm.js')
