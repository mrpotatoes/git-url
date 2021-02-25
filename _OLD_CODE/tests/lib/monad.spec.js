const chai = require('chai')
const { Right, Left, tryCatch } = require('../../lib/utils')
const { gitCommand } = require('../../lib/side-effects')

chai.should()

const addOne = x => x + 1
const half = x => x / 2
const either = x => 'major. error.'
const or = x => x

const throwFn = (msg = 'whoops') => (new Exception(msg))
const safe = () => ('made it woo!')

describe.skip('Utils.js', () => {
  describe('Left & Right', () => {
    it('Right', () => {
      const result = Right(3)
        .map(addOne)
        .map(half)
        .fold(either, or)
      result.should.equal(2)
    })
    
    it('Left', () => {
      const result = Left(3)
        .map(addOne)
        .map(half)
        .fold(either, or)
      result.should.equal('major. error.')
    })
    
    it('Try/Catch Either >> Error', () => {
      const whatIf = tryCatch(throwFn).fold(either, or)
      whatIf.should.equal('major. error.')
    })
    
    it('Try/Catch Either >> No error', () => {
      const whatIf = tryCatch(safe).fold(either, or)
      whatIf.should.equal('made it woo!')
    })
    
    it('working', () => {
      const remoteUrl = gitCommand('git remote -v')
      const whatIf = tryCatch(remoteUrl).fold(either, or)
      whatIf.should.equal('https://andriclibresinn@bitbucket.org/andriclibresinn/git-url.git')
    })
    
    it('!working', () => {
      const remoteUrl = gitCommand('git remote -vw')
      const whatIf = tryCatch(remoteUrl).fold(either, or)
      // console.log(whatIf)
      whatIf.should.equal('major. error.')
    })
  })
})
