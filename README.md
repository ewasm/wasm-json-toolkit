# SYNOPSIS 
[![NPM Package](https://img.shields.io/npm/v/wasm-json-toolkit.svg?style=flat-square)](https://www.npmjs.org/package/wasm-json-toolkit)
[![Build Status](https://img.shields.io/travis/wanderer/wasm-json-toolkit.svg?branch=master&style=flat-square)](https://travis-ci.org/wanderer/wasm-json-toolkit)
[![Coverage Status](https://img.shields.io/coveralls/wanderer/wasm-json-toolkit.svg?style=flat-square)](https://coveralls.io/r/wanderer/wasm-json-toolkit)

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)  

A small toolkit for converting wasm binaries into json and back. 

# INSTALL
`npm install wasm-json-toolkit`

# USAGE
```javascript
const fs = require('fs')
const wasm2json = require('wasm-json-toolkit').wasm2json

const wasm = fs.readFileSync('./test.wasm')
const json = wasm2json(wasm)

console.log(JSON.stringify(json, null, 2))
```
## exammple json output

wast
```
(module
  (func $addTwo (param i32 i32) (result i32)
    (i32.add
      (get_local 0)
      (get_local 1)))
  (export "addTwo" (func $addTwo)))
```

wasm
```
0x010661646454776f00000a09010700200020016a0b
```

json
```
[
  {
    "magic": [0,97,115,109],
    "version": [13,0,0,0]
  },
  {
    "section": "type",
    "entries": [
      {
        "form": "func",
        "params": ["i32", "i32"],
        "return_type": "i32"
      }
    ]
  },
  {
    "section": "function",
    "entries": [0]
  },
  {
    "section": "export",
    "entries": [
      {
        "field_str": "addTwo",
        "kind": "Function",
        "index": 0
      }
    ]
  },
  {
    "section": "code",
    "entries": [
      {
        "locals": [],
        "code": [
          {
            "name": "get_local",
            "immediaties": "0"
          },
          {
            "name": "get_local",
            "immediaties": "1"
          },
          {
            "name": "i32.add"
          },
          {
            "name": "end"
          }
        ]
      }
    ]
  }
]
```

# API
## wasm2json

converts a wasm binary into a json representation

**Parameters**

-   `Buffer`  

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

## json2wasm

converts a json representation to a wasm binary

**Parameters**

-   `Object`  

Returns **[Buffer](https://nodejs.org/api/buffer.html)** 
