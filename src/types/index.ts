export type FlagsFn = () => readonly string[]
export type ProviderConfigFn = (prov: string) => (url: string) => readonly string[]
export type ProviderFn = (url: string, flags: FlagsFn) => readonly string[]

export type ProviderConfig = {
  readonly [key: string]: ProviderConfigFn
}
