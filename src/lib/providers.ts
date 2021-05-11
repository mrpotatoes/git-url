/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as O from 'fp-ts/Option'
import * as R from 'fp-ts/Record'
import { pipe } from 'fp-ts/function'

import { generic } from './plugins'
import { userDefined } from './side-effects'
import { providerHost } from './paths'
import { ProviderConfig, ProviderConfigFn } from '../types'

const allProviders = (): ProviderConfig => ({
  ...userDefined(),
  ...{
    'github.com': generic,
    'gitlab.com': generic,
    'bitbucket.org': generic,
  }
})

export const providers = (gitUrl: string): any => pipe(
  allProviders(),
  R.lookup(providerHost(gitUrl)),
  O.map((fn: ProviderConfigFn) => fn(providerHost(gitUrl))),
  O.getOrElseW(() => (a: string) => (b: string) => 'wrong')
)
