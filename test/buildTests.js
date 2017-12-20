const fs = require('fs')
const cp = require('child_process')
const path = require('path')

const files = fs.readdirSync(path.join(__dirname, './testsuite'))
for (let file of files) {
  if (file.split('.')[1] === 'wast') {
    const binPath = path.join(__dirname, './wabt/bin/wast2json')
    const str = `${binPath} ${__dirname}/testsuite/${file} -o ${__dirname}/wasm/${file}.json`
    console.log(file)

    try {
      cp.execSync(str)
      const json = require(`${__dirname}/wasm/${file}.json`)
      for (const {filename, type} of json.commands) {
        if (filename && type !== 'module') {
          console.log(`removing ${filename} ${type}`)
          fs.unlinkSync(`${__dirname}/wasm/${filename}`)
        }
      }
      fs.unlinkSync(`${__dirname}/wasm/${file}.json`)
    } catch (e) {
      // console.log(e)
    }
  }
}
