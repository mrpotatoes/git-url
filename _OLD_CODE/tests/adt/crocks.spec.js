const chai = require('chai')
const Result = require('crocks/Result')
const and = require('crocks/logic/and')
const bimap = require('crocks/pointfree/bimap')
const composeB = require('crocks/combinators/composeB')
const ifElse = require('crocks/logic/ifElse')
const isNumber = require('crocks/predicates/isNumber')
const liftA2 = require('crocks/helpers/liftA2')

const All = require('crocks/All')
const Any = require('crocks/Any')
const mconcatMap = require('crocks/helpers/mconcat')

const { Err, Ok } = Result

// gte :: Number -> Number -> Boolean
const gte = y => x => x >= y

// lte :: Number -> Number -> Boolean
const lte = y => x => x <= y

// between :: (Number, Number) -> Boolean
const between = (x, y) => and(gte(x), lte(y))

// ensure :: (a -> Boolean) -> a -> Result a
const ensure = pred => ifElse(pred, Ok, Err)

// inRange :: Number -> Result
const inRange = ensure(between(10, 15))

// const { generic } = require('../../lib/plugins')
// const { baseUrl } = require('../../lib/paths')

// process.argv.push('/Users/alibresinn/.nvm/versions/node/v8.15.1/bin/node')
// process.argv.push('/Users/alibresinn/Projects/scratch/git-url/index.js')
// process.argv.push('--pr')
// process.argv.push('--buddy')
// process.argv.push('--pals')
// process.argv.push('--rel')
// process.argv.push('--commits')

// const person = { name: 'jason', age: 4 }

chai.should()

describe('./adts.js', () => {
  describe('crocks', () => {
    it.skip('their example', () => {
      // console.log(Result.Ok)

      inRange(12)
      //=> Ok 12

      inRange(25)
      //=> Err 25

      inRange('Test')
      //=> Err "Test"

      // ensureNumber :: a -> Result [a] a
      const ensureNumber = composeB(
        bimap(x => [x], x => x),
        ensure(isNumber)
      )

      // prod :: Number -> Number -> Number
      const prod = a => b =>
        a * b

      ensureNumber('Not a number 1')
        .alt(ensureNumber('Not a number 2'))
      //=> Err [ "Not a number 1", "Not a number 2" ]

      liftA2(
        prod,
        ensureNumber('Not 21'),
        ensureNumber('Not 2')
      )
      //=> Err [ "Not 21", "Not 2" ]

      const hey = liftA2(
        prod,
        ensureNumber(21),
        ensureNumber(2)
      )
      console.log(Result)
      //=> Ok 42
    })

    it('All => valueOf', () => {
      const one = All(true).concat(All(true))   //=> All true
      const two = All(true).concat(All(false))  //=> All false
      const three = All(false).concat(All(true))  //=> All false
      const four = All(false).concat(All(false)) //=> All false

      console.log(one.valueOf())
      console.log(two.valueOf())
      console.log(three.valueOf())
      console.log(four.valueOf())
    })

    it.skip('Any => valueOf (broken example)', () => {
      const trueString = Any('string')
      const falseString = Any('')
      const object = Any({ nice: true })

      trueString.concat(falseString) //=> Any false
      trueString.concat(object) //=> Any true
      const anyNumber = mconcatMap(Any, isNumber)

      // console.log(anyNumber(['string', 3]).valueOf())
      //=> Any true

      // anyNumber([true, 'string'])
    })
  })
})
