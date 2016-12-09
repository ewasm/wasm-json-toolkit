const tape = require('tape')
const text2json = require('../index.js').text2json

tape('text2json', t => {
  let text = 'i32.const 32 drop'
  let json = text2json(text)

  let expected = [{
    name: 'const',
    return_type: 'i32',
    immediates: '32'
  }, {
    name: 'drop'
  }]

  t.deepEquals(json, expected, 'test single const')

  text = 'br_table 0 0 0 0 i64.const 24'
  json = text2json(text)

  expected = [{
    name: 'br_table',
    immediates: ['0', '0', '0', '0']
  }, {
    return_type: 'i64',
    name: 'const',
    immediates: '24'
  }]

  t.deepEquals(json, expected, 'br_table')

  text = 'call_indirect 1 i64.const 24'
  json = text2json(text)

  expected = [{
    name: 'call_indirect',
    immediates: {
      index: '1',
      reserved: 0
    }
  }, {
    return_type: 'i64',
    name: 'const',
    immediates: '24'
  }]

  t.deepEquals(json, expected, 'call_indirect')

  text = 'i32.load 0 1 i64.const 24'
  json = text2json(text)

  expected = [{
    name: 'load',
    return_type: 'i32',
    immediates: {
      flags: '0',
      offset: '1'
    }
  }, {
    return_type: 'i64',
    name: 'const',
    immediates: '24'
  }]

  t.deepEquals(json, expected, 'memory immedites')

  t.end()
})
