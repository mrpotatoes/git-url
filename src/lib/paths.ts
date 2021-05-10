// TODO: Determine if git@github.com:rametta/pratica.git remote urls should work
// TODO: Most of these functions rely on the function above. Let's try to fix that.
import { URL } from 'url'
import { Either, left, right, tryCatch } from 'fp-ts/Either'

// Get the provider host from the full git remote url.
// TODO: This is temporary. Must return Left() or Right()
export const providerHost = (gitUrl: string): string => {
  try {
    return new URL(gitUrl).host
  } catch (error) {
    return '---bad---'
  }
}

export const andric = (gitUrl: string): Either<string, string> => {
  try {
    return right(new URL(gitUrl).host)
  } catch (error) {
    return left('no')
  }
}

// This will require some providerHost masaging.
export const segments = (gitUrl: string): readonly string[] => (
  new URL(gitUrl)
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
