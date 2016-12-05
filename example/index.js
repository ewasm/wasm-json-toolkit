const fs = require('fs')
const wasm2json = require('../index.js').wasm2json

const wasm = fs.readFileSync('./test.wasm')
console.log(wasm.toString('hex'))
const json = wasm2json(wasm)

console.log(JSON.stringify(json, null, 2))
