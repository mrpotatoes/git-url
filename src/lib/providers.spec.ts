import { providers } from './providers'
// import { gitRemote } from './side-effects'

describe('./src/lib/providers.spec.js', () => {
  describe('providers = (gitUrl: string)', () => {
    test('2', () => {
      const links = providers('http://github.com')('http://github.com/mrpotatoes/git-url')
      console.log(links)

      console.log(links.toString())

      expect(1).toEqual(1)
    })
  })
})


