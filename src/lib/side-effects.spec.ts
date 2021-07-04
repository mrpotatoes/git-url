import { safeExec } from './side-effects'
// import { gitRemote } from './side-effects'

import * as IO from 'fp-ts/IO'

describe('./src/lib/side-effects.spec.js', () => {
  describe('providers = (gitUrl: string)', () => {
    test('2', () => {
      const log = (s: unknown): IO.IO<void> => () => console.log(s)
      log('asd')()

      console.log('IO.of', IO.of('error')())

      /**
       * onLeft: (e: E) => I.IO<B>
       *            ==
       * onLeft: (e: E) => () => B
       */

      const t = safeExec('git remote -v')()
      console.log(t)

      expect(1).toEqual(1)
    })
  })
})

