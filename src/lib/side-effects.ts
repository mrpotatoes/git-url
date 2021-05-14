/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Everything in here can eventually move out.
 */
// import * as E from 'fp-ts/Either'
// import * as TE from 'fp-ts/TaskEither'
import O from 'open'
import * as IOE from 'fp-ts/IOEither'
import * as IO from 'fp-ts/IO'
import { toError } from 'fp-ts/Either'
import { pipe, constant } from 'fp-ts/function'
import { execSync } from 'child_process'

export const openLink = (link: string) => { O(link) }
export const open = (links: readonly string[]) => { links.forEach(openLink) }

export const gitCommand = (cmd: string) => (): string => (
  execSync(cmd, { stdio: 'pipe' })
    .toString()
    .split('\n')[0]
    .replace('(fetch)', '')
    .replace('origin', '')
    .trim()
)

export const safeExec = (u: string): IO.IO<string> => pipe(
  IOE.tryCatch(() => gitCommand(u)(), toError),
  IOE.fold(
    constant(() => 'error'),
    (o: string) => () => o
  )
)

// TODO: Use an Either in here to catch errors. We may not be in a git managed directory.
export const gitRemote = (): string => gitCommand('git remote -v')()

// The side-effect to get the plugins. Make this file bubbo.
export const userDefined = () => ({})
