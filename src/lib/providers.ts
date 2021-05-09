// This file just compiles the provider plugins into one.
// import url from "url";
import { generic } from './plugins'
import { userDefined } from './side-effects'
import { providerHost } from './paths'

// Should be at the very least urnary.
const knownProviders = () => ({
  'github.com': generic,
  'gitlab.com': generic,
  'bitbucket.org': generic,
})

// This should be singular since it evaluates to a single provider.
export const providers = (gitUrl: string) => {
  // TODO: Fix me, conflicts with the function name.
  // It isn't breaking now but it is confusing.
  const providers = {
    ...userDefined(),
    ...knownProviders()
  }

  // Get the single git provider
  const providerFn = providers[providerHost(gitUrl)] ? providers[providerHost(gitUrl)] : false

  console.log(gitUrl)

  // This is curryed so setup the first param so it can be used down the line.
  return providerFn(providerHost(gitUrl))
}

