import clsx from "clsx";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { useElementSize } from "@/fn/state/useElementSize";
import { Size } from "@/type/Size";

import styles from "./Screen.module.scss";

export const Screen = ({
  children,
}: {
  children: ReactNode;
}): ReactNode => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [rendered, setRendered] = useState(false);
  useEffect(() => {
    setRendered(!!ref.current);
  }, []);

  return (
    <ContextProvider element={ref.current}>
      <div className={clsx(styles.Screen)} ref={ref}>
        {rendered && children}
      </div>
    </ContextProvider>
  );
};

const context = createContext<Size>(Size.init());
const ContextProvider = ({
  element,
  children,
}: {
  element: HTMLElement | null;
  children: ReactNode;
}): ReactNode => {
  const screenSize = useElementSize(element);
  return (
    <context.Provider value={screenSize}>
      {children}
    </context.Provider>
  );
};

export const useScreenSize = () => useContext(context);
