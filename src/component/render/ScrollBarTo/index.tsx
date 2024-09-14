import clsx from "clsx";
import {
  ComponentPropsWithoutRef,
  createElement,
  CSSProperties,
  DetailedHTMLFactory,
  ForwardedRef,
  forwardRef,
  HTMLAttributes,
  ReactHTML,
  ReactNode,
} from "react";

import { Override } from "@/type/Override";

import styles from "./ScrollBarTo.module.scss";

export const ScrollBarTo = forwardRef(function ScrollBarTo<T extends keyof ReactHTML = "div">({
  as,
  rotate = 0,
  flipHorizontal = false,
  flipVertical = false,
  children,
  ...wrappedProps
}: Override<
  ComponentPropsWithoutRef<T>,
  {
    as?: T;
    rotate?: number;
    flipHorizontal?: boolean;
    flipVertical?: boolean;
    children: ReactNode;
  }
>, _ref: ForwardedRef<HTMLElementFrom<ReactHTML[T]>>): ReactNode {

  const cssVariables = {
    "--rotate": rotate,
    "--scale": `${flipHorizontal ? "-1" : "1"} ${flipVertical ? "-1" : "1"}`,
  } as CSSProperties;

  return createElement(
    as ?? "div",
    {
      ref: _ref,
      ...wrappedProps,
      className: clsx(
        styles.ScrollBarTo,
        wrappedProps.className,
      ),
      style: {
        ...cssVariables,
        ...wrappedProps.style,
      },
    },
    <div className={styles.ScrollBarToContentWrapper}>
      {children}
    </div>,
  );
});

type HTMLElementFrom<T>
  = T extends DetailedHTMLFactory<HTMLAttributes<unknown>, infer Element>
    ? Element
    : never;
