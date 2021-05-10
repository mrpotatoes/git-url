// #!/usr/bin/env node

console.clear()

import { providers } from './lib/providers'
import { gitRemote } from './lib/side-effects'

const provider = providers(gitRemote())

if (!provider) {
  console.log('There was no provider, this does not work, sorry.')
  process.exit(0)
}

const links = provider(gitRemote())
console.log(links)

// // Finally open the links.
// // open(links)
