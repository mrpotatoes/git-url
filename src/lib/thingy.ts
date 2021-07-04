// import * as IOE from 'fp-ts/IOEither'
// import { toError } from 'fp-ts/Either'
// import { pipe } from 'fp-ts/function'
// import { execSync } from 'child_process'

// export const gitCommand = (cmd: string) => (): string => (
//   execSync(cmd, { stdio: 'pipe' })
//     .toString()
//     .split("\n")[0]
//     .replace('(fetch)', '')
//     .replace('origin', '')
//     .trim()
// )

// // export const safeExec = (u: string): string => pipe(
// export const safeExec = (u: string): IOE.IOEither<Error, string> => pipe(
//   IOE.tryCatch(() => gitCommand(u)(), toError),
//   // IOE.map(i),
//   IOE.fold(
//     // Type 'string' is not assignable to type 'IO<Either<Error, string>>'.
//     () => '123',
//     () => '123',
//   )
// )

// console.log(safeExec('git remote -v')())
