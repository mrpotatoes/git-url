const { execSync } = require('child_process')
const open = require('open')
const { tryCatch, Right, Left } = require('./utils')

const homeDir = require('os').homedir()
const path = `${homeDir}/.git-url/providers.js`

const openLink = (link) => { open(link) } 
const openLinks = (links) => { links.forEach(openLink) }

// const branch = execSync('git branch', { stdio: 'pipe' }).toString().replace('*', '').trim()
// console.log(branch)

// https://github.com/rametta/pratica#encase
const gitCommand = cmd => () => (
  execSync(cmd, { stdio: 'pipe' })
    .toString()
    .split("\n")[0]
    .replace('(fetch)', '')
    .replace('origin', '')
    .trim()
)

const either = x => 'Malfunction'
const or = x => x

// TODO: Use an Either in here to catch errors. We may not be in a git managed directory.
const gitRemote = () => {
  // const remoteUrl = gitCommand('git ressmote -v')
  // const whatIf = tryCatch(remoteUrl).fold(either, or)

  // if (whatIf) {
  //   console.log('for now nothing better, just kill this process.')
  //   process.exit(0)
  // }

  const remoteUrls = [
    'https://git.forge.lmig.com/scm/uscmijbap/service-bpm-facade.git',
    'https://github.com/mrpotatoes/npath-complexity.git',
    'https://gitlab.com/fdroid/fdroid-website.git',
    'https://andriclibresinn@bitbucket.org/caasette-player/example-caasette-repo.git'
  ]

  return remoteUrls[1]
}

// The side-effect to get the plugins. Make this file bubbo.
const userDefined = () => ({
  // Can I curry a function def within an object? Let's figure this out!
  // 'git.forge.lmig.com': (provider, cleaned, flags) => {
  //   console.log(provider);
  //   const mapping = {
  //     '--pr': 'pull-requests'
  //   }

  //   const segments = url
  //     .parse(cleaned.replace('.git', '')) // Build a parsed url object.
  //     .path // Get the path property.
  //     .substring(1) // Remove the first character ('/').
  //     .split('/') // Turn into array.

  //   const sansFirstSegment = segments.slice(1, segments.length)
  //   const gitUrlBase = `${url.parse(cleaned).host}/${sansFirstSegment.join('/')}`
  //   const gitUrl = (path) => `https://${gitUrlBase}/${path}`

  //   // console.log(providedFlags)
  //   const links = providedFlags
  //     .filter(e => flagsUser.includes(e))
  //     .map(e => (mapping.hasOwnProperty(e) ? mapping[e] : e.replace('--', '')))
  //     .map(e => gitUrl(e)) // Would be faster to merge this into the other map but I need to read this at some point.

  //   return links
  // }
})

module.exports = {
  gitRemote,
  userDefined,
  gitCommand,
  open: openLinks,
}