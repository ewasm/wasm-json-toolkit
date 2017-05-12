# SYNOPSIS 

[![Greenkeeper badge](https://badges.greenkeeper.io/ewasm/wasm-json-toolkit.svg)](https://greenkeeper.io/)
[![NPM Package](https://img.shields.io/npm/v/wasm-json-toolkit.svg?style=flat-square)](https://www.npmjs.org/package/wasm-json-toolkit)
[![Build Status](https://img.shields.io/travis/ewasm/wasm-json-toolkit.svg?branch=master&style=flat-square)](https://travis-ci.org/ewasm/wasm-json-toolkit)
[![Coverage Status](https://img.shields.io/coveralls/ewasm/wasm-json-toolkit.svg?style=flat-square)](https://coveralls.io/r/ewasm/wasm-json-toolkit)

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

# CLI
Install `-g` global for cli usage.

`wasm2json [FILE]` given a file containing a wasm module produces a json representation  
`json2wasm [FILE]` given a file containing a json representation produces a wasm module  

# API
# wasm2json

[./index.js:6-6](https://github.com/ewasm/wasm-json-toolkit/blob/f349ee056b8e5f2691f83e345fe01d9ec0f8807a/./index.js#L6-L6 "Source code on GitHub")

converts a wasm binary into a json representation

**Parameters**

-   `Buffer`  

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

# json2wasm

[./index.js:13-13](https://github.com/ewasm/wasm-json-toolkit/blob/f349ee056b8e5f2691f83e345fe01d9ec0f8807a/./index.js#L13-L13 "Source code on GitHub")

converts a json representation to a wasm binary

**Parameters**

-   `Object`  

Returns **[Buffer](https://nodejs.org/api/buffer.html)** 

# text2json

[./index.js:27-27](https://github.com/ewasm/wasm-json-toolkit/blob/f349ee056b8e5f2691f83e345fe01d9ec0f8807a/./index.js#L27-L27 "Source code on GitHub")

converts text to json. The only text accepted is a simple list of opcode name and immediates

**Parameters**

-   `String`  

**Examples**

```javascript
const codeStr = `
i64.const 1
i64.const 2
i64.add
`
const json = text2json(codeStr)
```

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

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
    "name": "preramble",
    "magic": [0,97,115,109],
    "version": [13,0,0,0]
  },
  {
    "name": "type",
    "entries": [
      {
        "form": "func",
        "params": ["i32","i32"],
        "return_type": "i32"
      }
    ]
  },
  {
    "name": "function",
    "entries": [0]
  },
  {
    "name": "export",
    "entries": [
      {
        "field_str": "addTwo",
        "kind": "Function",
        "index": 0
      }
    ]
  },
  {
    "name": "code",
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
            "return_type": "i32",
            "name": "add"
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

# LICENSE
[MPL-2.0](https://tldrlegal.com/license/mozilla-public-license-2.0-(mpl-2))
