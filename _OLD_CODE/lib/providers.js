// This file just compiles the provider plugins into one.
const url = require('url')
const plugins = require('./plugins')
const { userDefined } = require('./side-effects')
const { providerHost } = require('./paths')

// Should be at the very least urnary.
const knownProviders = () => ({
  'github.com': plugins.generic,
  'gitlab.com': plugins.generic,
  'bitbucket.org': plugins.generic,
})

// This should be singular since it evaluates to a single provider.
const providers = (gitUrl) => {
  // TODO: Fix me, conflicts with the function name.
  // It isn't breaking now but it is confusing.
  const providers = {
    ...userDefined(),
    ...knownProviders()
  }

  // Get the single git provider
  const providerFn = providers[providerHost(gitUrl)] ? providers[providerHost(gitUrl)] : false

  // This is curryed so setup the first param so it can be used down the line.
  return providerFn(providerHost(gitUrl))
}

module.exports = {
  providers,
}
