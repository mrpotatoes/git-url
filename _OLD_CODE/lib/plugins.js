// TODO: A reader monad would most likely be best here. This way we can set the flags and
// not have to get it from global state. Currently this is impossible to test otherwise.
const { empty } = require('./utils')
const { repoUrl } = require('./paths')
const { providedFlags, addAlias, flags } = require('./flags')

// A generic way to handle plugins
const generic = provider => (gitUrl) => {
  const baseRepoUrl = repoUrl(gitUrl)
  const links = [baseRepoUrl('')]

  // Railroad program this: https://blog.logrocket.com/elegant-error-handling-with-the-javascript-either-monad-76c7ae4924a1/
  // If no link then default to the default url.
  if (empty(providedFlags())) {
    return links
  }

  // Railroad program this: https://blog.logrocket.com/elegant-error-handling-with-the-javascript-either-monad-76c7ae4924a1/
  // Could be faster to merge the two maps into one but
  // I need to read this so for now it stays.
  const flaggedLinks = flags
    .map(addAlias(provider))
    .map(e => baseRepoUrl(e))

  // TODO: This isn't part of this function. This should def be pulled out.
  // If I turn this into a function I can map over this and E-V-E-R-Y-T-H-I-N-G.
  const uniqueUrls = [...new Set(flaggedLinks)]

  return uniqueUrls
}

module.exports = {
  generic,
}