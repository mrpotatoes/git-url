const { exec, execSync } = require('child_process')
const open = require('open')
// const homeDir = require('os').homedir()
// const path = `${homeDir}/.git-url/providers.js`

const openLink = (link) => { open(link) }
const openLinks = (links) => { links.forEach(openLink) }

const gitCommand = cmd => () => (
  execSync(cmd, { stdio: 'pipe' })
    .toString()
    .split("\n")[0]
    .replace('(fetch)', '')
    .replace('origin', '')
    .trim()
)

// TODO: Use an Either in here to catch errors. We may not be in a git managed directory.
const gitRemote = () => gitCommand('git remote -v')()

// The side-effect to get the plugins. Make this file bubbo.
const userDefined = () => ({})

module.exports = {
  gitRemote,
  userDefined,
  gitCommand,
  open: openLinks,
}
