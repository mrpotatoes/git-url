const chai = require('chai')
const { baseUrl, segments, repoUrl, providerHost } = require('../../lib/paths')

chai.should()

describe('./lib/paths.js', () => {
  describe('happy path', () => {
    it('providerHost(url) should be just the TLD', () => {
      const host = providerHost('http://hey.com')
      host.should.equal('hey.com')
    })

    it('segments(url) should be a simple array', () => {
      const segs = segments('http://hey.com/these/should/show/up')
      segs.should.deep.equal([ 'these', 'should', 'show', 'up' ])
    })

    it('baseUrl(url) http:// should goto https://', () => {
      const gitUrl = 'http://hey.com/these/should/show/up.git'
      const url = 'https://hey.com/these/should/show/up'
      const segs = baseUrl(gitUrl).should.equal(url)
    })

    it('baseUrl(url) with nonsense should still work', () => {
      baseUrl('asd').should.equal('https://null/sd')
      baseUrl('asd.com').should.equal('https://null/sd.com')
      baseUrl('http:/asd.com').should.equal('https://null/asd.com')
    })
  })

  // Determine if these are even useful.
  describe.skip('unhappy path', () => {
    it('providerHost(url) should not work', () => {
      const host = providerHost('http://hey.com')
      ''.should.equal(true)
    })

    it('segments(url)', () => {
      const segs = segments('http://hey.com/these/should/show/up')
      ''.should.equal(true)
    })

    it('segments(url)', () => {
      const segs = segments('http://hey.com/these/should/show/up')
      ''.should.equal(true)
    })

    it('baseUrl(url) with nonsense should still work', () => {
      baseUrl('asd').should.equal('https://null/sd')
      baseUrl('').should.equal('')
      baseUrl().should.equal('')
    })
  })
})
