export type Nullable<T> = T | null

export type Optional<T> = T | undefined

export type TRecord<T> = Record<string, T>

export interface Type<T = any> extends Function {
  new (...args: any[]): T
}

export type ObjectLiteral = {
  [key: string]: any
}
