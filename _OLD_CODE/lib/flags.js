// TODO: Most of these functions rely on the function above. Let's try to fix that.
const path = require('path')
const yaml = require('js-yaml')
const fs = require('fs')

// TODO: Monad this up baby!
const mappings = yaml.safeLoad(
  fs.readFileSync(path.resolve('./configs/mappings.yml'), 'utf8')
)

// TODO: Curry this up so it doesn't depend on the code above.
// A lens here could be great so we don't break things if this property doesn't exist.
// providerAliases :: Object -> String
const providerAliases = providerHost => mappings.providers[providerHost].aliases

// addAlias :: Object -> String -> String
const addAlias = providerHost => e => (
  providerAliases(providerHost).hasOwnProperty(e)
    ? providerAliases(providerHost)[e]
    : e.replace('--', '')
)

// TODO: Are these worth currying or are they fine as is?
const aliases = mappings.providers['github.com'].aliases
const allFlags = [...mappings.flags, ...Object.keys(aliases)]
const allowedFlags = [...new Set(allFlags)]

// This should be in a monad so that we can test this easier. It's also a side effect.
const providedFlags = () => process.argv.slice(2, process.argv.length)

// TODO: Curry this function.
// Remove the user -- stuff to clean it up.
const sanitizedFlags = providedFlags().map(e => (e.replace('--', '')))

// Predicate to determine if something is required.
const isAllowedFlag = e => allowedFlags.includes(e)

// TODO: Curry this function.
// The flags that the plugins will build.
const flags = sanitizedFlags.filter(isAllowedFlag)

module.exports = {
  providedFlags,
  addAlias,
  flags,
}