import clsx from "clsx";
import {
  ReactNode,
  useEffect,
  useRef,
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
  const lastSetGameTimeRef = useRef(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const screenSize = useScreenSize();

  const scoreScrollPx = (screenSize.height * scoreLength) / gameDuration;
  useEffect(() => {
    const hasBeenUpdatedElsewhere = gameTime !== lastSetGameTimeRef.current;
    if (!hasBeenUpdatedElsewhere) return;
    if (!ref.current) return;
    const gameProgessPercentage = gameTime / scoreLength;
    ref.current.scrollTo({
      top: scoreScrollPx * gameProgessPercentage,
    });
  }, [scoreScrollPx, gameTime, scoreLength]);

  return (
    <ScrollBarTo className={clsx(styles.PreviewOverlay,
    )}
    ref={ref}
    flipVertical
    onScroll={() => {
      if (!ref.current) return;
      const nextTime = ref.current.scrollTop / scoreScrollPx * scoreLength;
      lastSetGameTimeRef.current = nextTime;
      setGameTime(nextTime);
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
