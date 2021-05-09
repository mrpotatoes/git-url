// TODO: Determine if git@github.com:rametta/pratica.git remote urls should work
// TODO: Most of these functions rely on the function above. Let's try to fix that.
import url from "url";

// Get the provider host from the full git remote url.
export const providerHost = gitUrl => (url.parse(gitUrl).host)

// This will require some providerHost masaging.
export const segments = gitUrl => (
  url
    .parse(gitUrl.replace('.git', '')) // Build a parsed url object.
    .path // Get the path property.
    .substring(1) // Remove the first character ('/').
    .split('/') // Turn into array.
)

export const baseUrl = gitUrl => {
  const pathParts = segments(gitUrl)
  const base = `${url.parse(gitUrl).host}/${pathParts.join('/')}`
  const repoUrl = `https://${base}`

  return repoUrl
}

export const repoUrl = gitUrl => path => `${baseUrl(gitUrl)}/${path}`
