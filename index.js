/**
 * converts a wasm binary into a json representation
 * @param {Buffer}
 * @return {Object}
 */
exports.wasm2json = require('./wasm2json')

/**
 * converts a json representation to a wasm binary
 * @param {Object}
 * @return {Buffer}
 */
exports.json2wasm = require('./json2wasm')

/**
 * converts text to json. The only text accepted is a simple list of opcode name and immediates
 * @param {String}
 * @return {Object}
 * @example
 * const codeStr = `
 * i64.const 1
 * i64.const 2
 * i64.add
 * `
 * const json = text2json(codeStr)
 */
exports.text2json = require('./text2json')
