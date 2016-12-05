const fs = require('fs')
const cp = require('child_process')
const path = require('path')

const files = fs.readdirSync(path.join(__dirname, './testsuite'))
for (let file of files) {
  const binPath = path.join(__dirname, './wabt/out/wast2wasm')
  const str = `${binPath} ./testsuite/${file} -o ./wasm/${file}.wasm`
  console.log(str)
  cp.exec(str)
}

