const Bn = require('bn.js')

exports.readUint = (stream) => {
  return exports
    .readBn(stream)
    .toNumber()
}

exports.read = (stream) => {
  return exports
    .readBn(stream)
    .toString()
}

exports.readSigned = (stream) => {
  return exports
    .readSignedBn(stream)
    .toString()
}

exports.readBn = (stream) => {
  const num = new Bn(0)
  let shift = 0
  let byt
  while (true) {
    byt = stream.read(1)[0]
    num.ior(new Bn(byt & 0x7f).shln(shift))
    if (byt >> 7 === 0) {
      break
    } else {
      shift += 7
    }
  }
  return num
}

exports.readSignedBn = (stream) => {
  const num = new Bn(0)
  let shift = 0
  let byt
  while (true) {
    byt = stream.read(1)[0]
    num.ior(new Bn(byt & 0x7f).shln(shift))
    shift += 7
    if (byt >> 7 === 0) {
      break
    }
  }
  // sign extend if negitive
  if (byt & 0x40) {
    num.setn(shift)
  }
  return num.fromTwos(shift)
}

exports.write = (json, stream) => {
  const num = new Bn(json)
  while (true) {
    const i = num.maskn(7).toNumber()
    num.ishrn(7)
    if (num.isZero()) {
      stream.write([i])
      break
    } else {
      stream.write([i | 0x80])
    }
  }
}

exports.writeSigned = (json, stream) => {
  let num = new Bn(json)
  const isNeg = num.isNeg()
  if (isNeg) {
    // 64 bits is the largest width supported + 7 bit for padding
    num = num.toTwos(71)
  }
  while (true) {
    const i = num.maskn(7).toNumber()
    num.ishrn(7)
    if ((isNegOne(num) && (i & 0x40) !== 0) ||
        (num.isZero() && (i & 0x40) === 0)) {
      stream.write([i])
      break
    } else {
      stream.write([i | 0x80])
    }
  }

  function isNegOne (num) {
    return isNeg && num.toString(2).split('').every(i => i === '1')
  }
}

