import { execSync } from 'child_process'
import O from 'open'
// const homeDir = require('os').homedir()
// const path = `${homeDir}/.git-url/providers.js`

export const openLink = (link: string) => { O(link) }
export const open = (links) => { links.forEach(openLink) }

export const gitCommand = (cmd: string) => () => (
  execSync(cmd, { stdio: 'pipe' })
    .toString()
    .split("\n")[0]
    .replace('(fetch)', '')
    .replace('origin', '')
    .trim()
)

// TODO: Use an Either in here to catch errors. We may not be in a git managed directory.
export const gitRemote = () => gitCommand('git remote -v')()

// The side-effect to get the plugins. Make this file bubbo.
export const userDefined = () => ({})
