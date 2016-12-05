const tape = require('tape')
const leb = require('../leb.js')
const Stream = require('../stream.js')

tape('leb - round trips', t => {
  let stream = new Stream()

  leb.write(8, stream)
  t.equals(stream.buffer.toString('hex'), '08')
  t.equals(leb.read(stream), '8')

  leb.writeSigned('-9223372036854775808', stream)
  t.equals(stream.buffer.toString('hex'), '8080808080808080807f')
  t.equals(leb.readSigned(stream), '-9223372036854775808')

  leb.writeSigned('-100', stream)
  t.equals(stream.buffer.toString('hex'), '9c7f')
  t.equals(leb.readSigned(stream), '-100')

  leb.writeSigned('100', stream)
  t.equals(stream.buffer.toString('hex'), 'e400')
  t.equals(leb.readSigned(stream), '100')

  leb.writeSigned('10', stream)
  t.equals(stream.buffer.toString('hex'), '0a')
  t.equals(leb.readSigned(stream), '10')

  leb.writeSigned('2141192192', stream)
  t.equals(stream.buffer.toString('hex'), '808080fd07')
  t.equals(leb.readSigned(stream), '2141192192')

  t.end()
})
