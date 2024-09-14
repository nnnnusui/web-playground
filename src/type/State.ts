import { NestedKeyOf } from "./NestedKeyOf";
import { NestedValueOf } from "./NestedValueOf";
import { PartializedTuple } from "./PartializedTuple";
import { Setter } from "./Setter";

export type State<T> = [T, Setter<T>];

export const State = (() => {
  const from = <T>(args: StateArgs<T>): State<T> => {
    if (Array.isArray(args)) return args;
    return [args.get, args.set];
  };

  const partialOnce = <T>([state, setState]: State<T>) =>
    <Key extends keyof T>(key: Key): State<T[Key]> =>
      from([state[key], Setter.from((use) => setState((prev) => {
        // prev[key] = use(prev[key]);
        return {
          ...prev,
          [key]: use(prev[key]),
        };
      }))]);

  return {
    fromOptional: <T>(
      optional: OptionalStateArgs<T>,
    ): OptionalState<T> => {
      if (Array.isArray(optional)) return optional;
      if (optional == null) return [undefined, undefined];
      return [optional.get, optional.set];
    },
    from,
    /** Get partialized. */
    partial: <T>(statePair: State<T>) =>
      <Keys extends PartializedTuple<NestedKeyOf<T>>>(
        ...keys: Keys
      ): State<NestedValueOf<T, Keys>> =>
        keys.reduce<State<unknown>>(
          (it, key) => partialOnce(it)(key as never),
          statePair as State<unknown>,
        ) as State<NestedValueOf<T, Keys>>,
  };
})();

type StateObj<T> = { get: T; set: Setter<T> };
type StateArgs<T>
  = State<T>
  | StateObj<T>;
type OptionalState<T>
  = State<T>
  | [undefined, undefined];
type OptionalStateArgs<T>
  = OptionalState<T>
  | StateObj<T>
  | undefined;
