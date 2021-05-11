General
* Use commander instead
* this gets rid of the flags yaml file

- [ ] `./lib/paths.ts`
  * Convert providerHost to functional
- [ ] `./lib/side-effects.ts`
  * Completely functional
- [ ] `./lib/providers.ts`
  * providers use flow/pipe here
- [ ] `./lib/plugins.ts`
  * use pipe here
  * Perhaps an `Option.map` here would be best to handle the control flow
- [ ] `./lib/plugins.ts`
  * providedFlags should use a `Reader`
- [ ] `./index.ts`
  * Currently the code looks like such: `providers(gitRemote())(gitRemote())`
    * fix this garbage.
- [x] ~`./lib/utils.ts`~
  * ~Remove empty, use fp-ts instead~
    - ~https://gcanti.github.io/fp-ts/modules/Array.ts.html#isempty~
