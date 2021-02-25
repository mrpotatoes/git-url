const chai = require('chai')
const { Ok, Err, get, Maybe } = require('pratica')

const { generic } = require('../../lib/plugins')
const { baseUrl, repoUrl } = require('../../lib/paths')
const { addAlias } = require('../../lib/flags')

process.argv.push('/Users/alibresinn/.nvm/versions/node/v8.15.1/bin/node')
process.argv.push('/Users/alibresinn/Projects/scratch/git-url/index.js')
process.argv.push('--pr')
process.argv.push('--buddy')
process.argv.push('--pals')
process.argv.push('--rel')
process.argv.push('--commits')

const person = { name: 'jason', age: 4 }

chai.should()

// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// Static variables for testing.
const gitUrl = 'https://andriclibresinn@bitbucket.org/andriclibresinn/git-url.git'
const provider = 'github.com'
const providedFlags = () => (
  ['pr', 'commits', 'bogus']
  // [] // Test the no flags version.
)

// For one of the chains.
const isEmptyFlags = url =>
  Boolean(providedFlags().length)
    ? Ok({ baseUrl: url, flags: providedFlags() })
    : Err([url])

const flagUrls = e => {
  const baseRepoUrl = repoUrl(e.baseUrl)
  const convert = e => baseRepoUrl(e)
  return e.flags.map(addAlias(provider)).map(convert)
}

const repoBaseUrl = gitUrl => `${baseUrl(gitUrl)}/`

// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------

describe('./adts.js', () => {
  describe('pratica', () => {
    it.skip('their example', () => {
      const plugin = generic('github.com')
      const urls = plugin('git@github.com:rametta/pratica.git')

      const isPerson = p => p.name && p.age ? Ok(p) : Err('Not a person')
      const isOlderThan2 = p => p.age > 2 ? Ok(p) : Err('Not older than 2')
      const isJason = p => p.name === 'jason' ? Ok(p) : Err('Not jason')

      // const providedFlags = p => p.name && p.age ? Ok(p) : Err(['default urls'])

      // const isEmptyParams = providedFlags()

      const hey = Ok(person)
        .chain(isPerson)
        .chain(isOlderThan2)
        .chain(isJason)
        .cata({
          Ok: p => console.log('this person satisfies all the checks'),
          Err: msg => console.log(msg) // if any checks return an Err, then this function will be called. If isPerson returns Err, then isOlderThan2 and isJason functions won't even execute, and the err msg would be 'Not a person'
        })

      console.log(hey)
    })
    
    it.skip('my attempt', () => {
      // Right now this is the same as a compose unfortunatly.
      const gitUrls = Ok(gitUrl)
        .map(baseUrl)
        .map(repoBaseUrl)
        .chain(isEmptyFlags)
        .map(flagUrls)
        .cata({
          Ok: p => console.log('Ok: ', p),
          
          /**
           * if any checks return an Err, then this function will
           * be called. If isPerson returns Err, then isOlderThan2
           * and isJason functions won't even execute, and the err
           * msg would be 'Not a person'
           */
          Err: msg => console.log(msg)
        })

      console.log('\nUrls to open: ', gitUrls.map(e => { console.log(e)}))
    })
  })
})
