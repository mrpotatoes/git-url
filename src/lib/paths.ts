// TODO: Determine if git@github.com:rametta/pratica.git remote urls should work
// TODO: Most of these functions rely on the function above. Let's try to fix that.
import url from 'url'

// Get the provider host from the full git remote url.
// TODO: This is temporary. Must return Left() or Right()
export const providerHost = (gitUrl: string): string => {
  try {
    return new url.URL(gitUrl).host
  } catch (error) {
    return '---bad---'
  }
}

// This will require some providerHost masaging.
export const segments = (gitUrl: string): readonly string[] => (
  new url.URL(gitUrl)
    .pathname
    .replace('.git', '')
    .substring(1)
    .split('/')
)

export const baseUrl = (gitUrl: string) => {
  const pathParts = segments(gitUrl)
  const base = `${providerHost(gitUrl)}/${pathParts.join('/')}`
  const repoUrl = `https://${base}`

  return repoUrl
}

export const repoUrl = (gitUrl: string) => (path: string) => `${baseUrl(gitUrl)}/${path}`
