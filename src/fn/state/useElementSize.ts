import { useCallback, useSyncExternalStore } from "react";

import { Size } from "@/type/Size";

/** Observed element size state. */
export const useElementSize = (element: Element | null) => {
  const subscribe = useCallback((onStoreChange: () => void) => {
    const observer = new ResizeObserver((entries) => {
      entries.forEach(onStoreChange);
    });
    if (element) observer.observe(element);
    return () => observer.disconnect();
  }, [element]);

  const width = useSyncExternalStore(subscribe, () => element?.clientWidth ?? 0);
  const height = useSyncExternalStore(subscribe, () => element?.clientHeight ?? 0);

  return Size.from({ width, height });
};
