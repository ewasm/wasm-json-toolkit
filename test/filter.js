const fs = require('fs')
const tape = require('tape')
const jsonToolkit = require('../index.js')

const wasm2json = jsonToolkit.wasm2json

const binary = fs.readFileSync(`${__dirname}/addTwo.wasm`)

tape('filtering', t => {
  const json = wasm2json(binary, new Set(['export']))
  t.equals(json.length, 1, 'shoudl have correct length')
  t.end()
})

tape('finding', t => {
  const json = wasm2json(binary)
  const iterator = jsonToolkit.findSections(json, ['type', 'element', 'export'])
  const results = [...iterator]
  t.equals(results.length, 3)
  t.equals(results[1], undefined)
  t.equals(results[0].name, 'type')
  t.equals(results[2].name, 'export')

  t.end()
})
