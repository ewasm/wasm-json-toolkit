const transformers = require('../transformers')
const tape = require('tape')
const testJson = require('./address.json')

tape('testing transformers', t => {
  const found = transformers.findSection(testJson, 'code')
  t.deepEquals(found, testJson[testJson.length - 1])

  let importSection = {
    'name': 'import',
    'entries': [
      {
        'moduleStr': 'spectest',
        'fieldStr': 'print',
        'kind': 'Function',
        'index': 0
      }
    ]
  }

  transformers.setSection(testJson, importSection)
  t.deepEquals(testJson[2], importSection, 'should add a new section')

  importSection = {
    'name': 'import',
    'entries': [
      {
        'moduleStr': 'test',
        'fieldStr': 'test',
        'kind': 'Function',
        'index': 0
      }
    ]
  }

  transformers.setSection(testJson, importSection)
  t.deepEquals(testJson[2], importSection, 'should overwrite the section')

  const dataEntry = {
    'index': 0,
    'offset': {
      'return_type': 'i32',
      'name': 'const',
      'immediaties': '0'
    },
    'data': [97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 12, 121, 122]
  }
  const dataSection = {
    'name': 'data',
    'entries': [dataEntry]
  }
  transformers.setSection(testJson, dataSection)
  t.deepEquals(testJson[testJson.length - 1], dataSection, 'should have data section')

  const invalidSection = {
    name: 'invalid'
  }

  try {
    transformers.setSection(testJson, invalidSection)
    t.fail('should error')
  } catch (e) {
    t.pass('shouldnt use invalid section names')
  }

  const codeEntry = {
    'locals': [],
    'code': [{'name': 'nop'}]
  }

  transformers.addEntry(testJson, 'code', codeEntry)
  const code = transformers.findSection(testJson, 'code')
  t.deepEquals(code.entries.pop(), codeEntry)

  // add en entry to a nonexistance section
  // remove the data section
  testJson.pop()
  transformers.addEntry(testJson, 'data', dataEntry)
  t.deepEquals(testJson[testJson.length - 1], dataSection, 'should have data section with one entry')

  const newFunc = {
    type: {
      'form': 'func',
      'params': [
        'i32'
      ]
    },
    code: {
      'locals': [],
      'code': [{
        'name': 'get_local',
        'immediaties': '0'
      }, {
        'return_type': 'i32',
        'name': 'load8_u',
        'immediaties': {
          'flags': 0,
          'offset': 0
        }
      }]
    }
  }

  transformers.addFunction(testJson, newFunc)
  const funcSection = transformers.findSection(testJson, 'function')
  t.equals(funcSection.entries.length, 3)
  t.equals(funcSection.entries[2], 0, 'should correctly link the code and type section')

  let typeSection = transformers.findSection(testJson, 'type')
  t.equals(typeSection.entries.length, 1)

  const codeSection = transformers.findSection(testJson, 'code')
  t.equals(codeSection.entries.length, 3)

  // adding miports
  importSection = {
    import: {
      'moduleStr': 'ethereum',
      'fieldStr': 'ethereum',
      'kind': 'Function'
    },
    type: {
      'form': 'func',
      'params': [
        'i64'
      ]
    }
  }

  transformers.addImport(testJson, importSection)

  typeSection = transformers.findSection(testJson, 'type')
  t.equals(typeSection.entries.length, 2)

  importSection = transformers.findSection(testJson, 'import')
  t.equals(importSection.entries.length, 2)

  t.end()
})
