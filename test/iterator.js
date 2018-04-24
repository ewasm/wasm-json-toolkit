const fs = require('fs')
const tape = require('tape')
const Iter = require('../iterator.js')
const json2wasm = require('../json2wasm.js')

tape('iterator - customsection', t => {
  t.plan(1)
  const wasm = fs.readFileSync(`${__dirname}/customSection.wasm`)
  const it = new Iter(wasm)
  for (const section of it) {
    t.equals(section.type, 'custom')
  }
})

tape('iterator - customsection', t => {
  t.plan(2)
  const wasm = fs.readFileSync(`${__dirname}/addTwo.wasm`)
  const it = new Iter(wasm)
  const wasm2 = it.wasm
  t.deepEquals(wasm, wasm2)

  let testEntry
  for (const section of it) {
    if (section.type === 'type') {
      const json = section.toJSON()
      json.entries[0].return_type = 'i64'
      testEntry = json.entries[0]
      const entry = json2wasm.entryGenerators.type(json.entries[0])

      section.appendEntries([entry])
    }
  }
  const modWasm = it.wasm
  const it2 = new Iter(modWasm)
  for (const section of it2) {
    if (section.type === 'type') {
      const json = section.toJSON()
      const last = json.entries.pop()
      t.deepEquals(testEntry, last)
    }
  }
})
