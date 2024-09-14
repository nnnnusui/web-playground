import clsx from "clsx";
import {
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

import { useScreenSize } from "@/component/provide/Screen";
import { ScrollBarTo } from "@/component/render/ScrollBarTo";
import { Setter } from "@/type/Setter";

import styles from "./PreviewOverlay.module.scss";

export const PreviewOverlay = ({
  gameTime,
  setGameTime,
  gameDuration,
  scoreLength,
}: {
  gameTime: number;
  setGameTime: Setter<number>;
  gameDuration: number;
  scoreLength: number;
}): ReactNode => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inAction, setInAction] = useState(false);
  const screenSize = useScreenSize();

  const scoreScrollPx = (screenSize.height * scoreLength) / gameDuration;
  const gameProgessPercentage = gameTime / scoreLength;
  useEffect(() => {
    if (inAction) return;
    if (!ref.current) return;
    ref.current.scrollTo({
      top: scoreScrollPx * gameProgessPercentage,
    });
  }, [inAction, scoreScrollPx, gameProgessPercentage]);

  return (
    <ScrollBarTo className={clsx(styles.PreviewOverlay)}
      ref={ref}
      flipVertical
      onPointerDown={() => setInAction(true)}
      onPointerUp={() => setInAction(false)}
      onScroll={() => {
        if (!inAction) return;
        if (!ref.current) return;
        setGameTime(ref.current.scrollTop / scoreScrollPx * scoreLength);
      }}
    >
      <div
        style={{
          height: `${screenSize.height + scoreScrollPx}px`,
        }}
      >{JSON.stringify(screenSize, null, 2)}</div>
    </ScrollBarTo>
  );
};
