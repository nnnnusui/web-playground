import { useCallback, useRef } from "react";

type Debounce = (callback: () => void) => void;

/**
 * Delays the execution of the callback.
 * If triggered again before the callback is executed,
 * the previous execution is cancelled.
 */
export const useDebounce = (
  delayMs: number,
): Debounce => {
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const debounce: Debounce = useCallback((callback) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => callback(), delayMs);
  }, [delayMs]);
  return debounce;
};
