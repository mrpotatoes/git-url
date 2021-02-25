const chai = require('chai')
const { generic } = require('../../lib/plugins')

chai.should()

// This is honestly one of the grossest thing ever.
// HA! I even have to re-save this to get this to work! THAT'S INSANE! LMAO!
process.argv.push('/Users/alibresinn/.nvm/versions/node/v8.15.1/bin/node')
process.argv.push('/Users/alibresinn/Projects/scratch/git-url/index.js')
process.argv.push('--pr')
process.argv.push('--buddy')
process.argv.push('--pals')
process.argv.push('--rel')
process.argv.push('--commits')

describe('./lib/plugins.js', () => {
  describe('happy path()', () => {
    it('generic() should ...', () => {
      const plugin = generic('github.com')
      const urls = plugin('git@github.com:rametta/pratica.git')

      console.log(urls)

    })
  })
})
