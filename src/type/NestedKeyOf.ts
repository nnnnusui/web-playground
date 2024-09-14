/**
 * Get nested objects keys tuples.
 */
export type NestedKeyOf<T> =
  T extends Record<PropertyKey, unknown>
    ? {
      [Key in keyof T]: Required<T>[Key] extends object
        ? [Key, ...NestedKeyOf<Required<T>[Key]>]
        : [Key]
    }[keyof T]
    : T extends unknown[]
      ? T[keyof T] extends object
        ? [keyof T, ...NestedKeyOf<T[keyof T]>]
        : [keyof T]
      : [];
