const fs = require('fs')
const path = require('path')
const tape = require('tape')
const wasm2json = require('../wasm2json.js')
const json2wasm = require('../json2wasm.js')

tape('round trips', t => {
  fs.readdir(path.join(__dirname, './wasm'), async (err, files) => {
    // files = ['func_ptrs.wast.0.wasm']
    if (err) throw err
    for (let file of files) {
      t.comment(file)
      await new Promise(resolve => {
        fs.readFile(path.join(__dirname, './wasm', file), (err, wasmBin) => {
          if (err) throw err
          const json = wasm2json(wasmBin)
          const bin = json2wasm(json)
          t.equals(bin.toString('hex'), wasmBin.toString('hex'))
          resolve()
        })
      })
    }
    t.end()
  })
})
