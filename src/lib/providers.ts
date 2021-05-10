// This file just compiles the provider plugins into one.
// import url from "url";
import { generic } from './plugins'
import { userDefined } from './side-effects'
import { providerHost } from './paths'
import { ProviderConfig } from '../types'

// Should be at the very least urnary.
const knownProviders = (): ProviderConfig => ({
  'github.com': generic,
  'gitlab.com': generic,
  'bitbucket.org': generic,
})

// This should be singular since it evaluates to a single provider.
// TODO: Return Maybe.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const providers = (gitUrl: string): any => {
  // It isn't breaking now but it is confusing.
  const providers: ProviderConfig = {
    ...userDefined(),
    ...knownProviders()
  }

  // Get the single git provider
  // TODO: Make this a Maybe so I return the same object instead of function or false.
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const providerFn = providers[providerHost(gitUrl)] ? providers[providerHost(gitUrl)] : () => { }

  // Also cleans up this code here.
  return providerFn(providerHost(gitUrl))
}
