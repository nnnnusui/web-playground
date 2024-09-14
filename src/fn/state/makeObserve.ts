import { useEffect } from "react";

import { State } from "@/type/State";
import { useEffectEvent } from "./useEffectEvent";

const useObserve = <T>(
  statePair: State<T>,
  target: T,
) => {
  const [, setState] = statePair;
  const set = useEffectEvent((target: T) => setState(target));
  useEffect(() => set(target), [set, target]);
  return statePair;
};

export { useObserve as makeObserve };
