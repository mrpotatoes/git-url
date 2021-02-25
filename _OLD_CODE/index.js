#!/usr/bin/env node

console.clear('')

const { providers } = require('./lib/providers')
const { open, gitRemote, providedFlags } = require('./lib/side-effects')

const provider = providers(gitRemote())

if (!provider) {
  console.log('')
  process.exit(0)
}

const links = provider(gitRemote(), providedFlags)
console.log(links)

// Finally open the links.
// open(links)
