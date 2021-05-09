import fs from 'fs'

// Simple functional utils so I don't need to pull in a big library to do this.
// https://tinyurl.com/y34evghg

// TODO: Add JUST and NOTHING.

const Nothing = x => ({})
const Just = x => ({})

export const Right = x => ({
  map: f => Right(f(x)),
  fold: (f, g) => g(x),
  inspect: () => `Right(${x})`
})

export const Left = x => ({
  map: f => Left(x),
  fold: (f, g) => f(x),
  inspect: () => `Left(${x})`
})

// Still learning, forgive me.
export const tryCatch = (tryFn) => {
  try {
    const tried = tryFn()
    return Right(tried)
  } catch (error) {
    return Left(null)
  }
}

// TODO: This would maybe make more sense as a MAYBE.
// TODO: Make this work correctly please.
// Get the user plugin && include it
const userPlugins = (path) => {
  return (fs.existsSync(path))
    ? Right(path)
    : Left(null)
}

export const empty = (arr) => (!Boolean(arr.length))
