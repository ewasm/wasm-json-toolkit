const fs = require('fs')
const tape = require('tape')
const json2wasm = require('../json2wasm')
const wasm2json = require('../wasm2json')

const wasm = fs.readFileSync(`${__dirname}/customSection.wasm`)
const expectedJson = [{
  'name': 'preramble',
  'magic': [
    0,
    97,
    115,
    109
  ],
  'version': [
    13,
    0,
    0,
    0
  ]
}, {
  'name': 'custom',
  'sectionName': 'a custom section',
  'payload': 'this is the payload'
}]

tape('testing custom sections', t => {
  const json = wasm2json(wasm)
  json[1].payload = Buffer.from(json[1].payload).toString()
  t.deepEquals(expectedJson, json, 'should parse correctly')

  const generatedWasm = json2wasm(json)
  t.equals(generatedWasm.toString('hex'), wasm.toString('hex'), 'should generate correctly')

  t.end()
})
