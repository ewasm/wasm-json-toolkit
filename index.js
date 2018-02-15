/**
 * Converts a wasm binary into a json representation
 * @param {Buffer}
 * @return {Object}
 */
exports.wasm2json = require('./wasm2json')

/**
 * Converts a json representation to a wasm binary
 * @param {Object}
 * @return {Buffer}
 */
exports.json2wasm = require('./json2wasm')

/**
 * Converts text to json. The only accepts text that is a simple list of opcode name and immediates
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

exports.findSections = function * (array, sectionOrder) {
  let section = array[0]
  let index = 0
  const wantedSections = new Set(sectionOrder)
  let nextSection = sectionOrder.shift()

  while (section) {
    if (!wantedSections.has(section.name)) {
      section = array[++index]
    } else {
      if (section.name === nextSection) {
        yield section
        section = array[++index]
      } else {
        yield null
      }
      nextSection = sectionOrder.shift()
    }
  }
}
