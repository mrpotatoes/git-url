const chai = require('chai')
const S = require('sanctuary')

chai.should()

describe.skip('./lib/adts/sanctuary.js', () => {
  describe('sanctuary', () => {
    it('Get data oot', () => {
      const asd = S.fromMaybe('')
      const safeASD = S.Just('asd')
      const safeASD2 = S.Nothing

      console.log(S.Maybe)
      
      // console.log('S.Just: ', asd(safeASD))
      // console.log('S.Nothing: ', asd(safeASD2))
      // console.log(asd(S.of(S.Maybe)('Another text')))
      // console.log(S.show(['foo', 'bar', 'baz']))
    })
  })
})
