import { andric } from './paths'
import { URL } from 'url'
import * as E from 'fp-ts/Either'
import { pipe, flow } from 'fp-ts/function'

describe('./src/lib/paths.spec.js', () => {
  describe('providerHost()', () => {
    test.skip('2', () => {
      const unsafeHead = <A>(as: ReadonlyArray<A>): A => {
        if (as.length > 0) {
          return as[0]
        } else {
          // eslint-disable-next-line functional/no-throw-statement
          throw new Error('empty array')
        }
      }

      const head = <A>(as: ReadonlyArray<A>): E.Either<Error, A> =>
        E.tryCatch(
          () => unsafeHead(as),
          (e) => (e instanceof Error ? e : new Error('unknown error'))
        )

      expect(head([])).toEqual(E.left(new Error('empty array')))
      expect(head([1, 2, 3])).toEqual(E.right(1))
    })

    test('actual conversion', () => {
      const foldie = E.fold(() => ('errorHappened'), (e) => (e))

      try {
        new URL('123')
      } catch (e) {
        console.log(e.name)
        // console.log('error')
      }

      // console.log(foldie(andric('github.com')))
      // console.log(foldie(andric('http://github.com')))

      // const mappie = (deets: E.Either<Error, string>) => {
      //   console.log(E.isLeft(deets))
      //   console.log(deets)

      //   return 'asd'
      // }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const thingy = (something: any) => `${something}: this is a legit thingy`


      // console.log(pipe(andric('://andric.com'), E.map(thingy)))
      console.log(pipe(andric('https://github.com'), E.map(thingy), foldie))

      // console.log(mappie(andric('qwe')))
      // console.log(mappie(andric('https://github.com')))

      // expect(andric('')).toEqual(E.left(new Error('unknown error')))
      // expect(andric('https://github.com/heythere.nothing')).toEqual(E.right('github.com'))
    })
  })
})
