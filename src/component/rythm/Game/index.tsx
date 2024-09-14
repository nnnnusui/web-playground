import clsx from "clsx";
import {
  CSSProperties,
  ReactNode,
  useEffect,
  useRef,
} from "react";

import { useScreenSize } from "@/component/provide/Screen";

import styles from "./Game.module.scss";

export const Game = ({
  time,
  duration,
}: {
  time: number;
  duration: number;
}): ReactNode => {
  const ref = useRef<HTMLDivElement | null>(null);
  const screenSize = useScreenSize();
  useEffect(() => console.log(screenSize.width), [screenSize.width]);
  const notes = [{
    time: 4,
  }];

  const cssVariables = {
    "--game-time": `${time}`,
    "--game-duration": `${duration}`,
  } as CSSProperties;

  return (
    <div className={clsx(styles.Game)}
      ref={ref}
      style={cssVariables}
    >
      {ref.current && notes.map((note, index) => {
        const progress = (note.time - time) / duration;
        return (
          <div className={clsx(styles.Note)}
            key={index}
            style={{
              bottom: `${(progress * screenSize.height)}px`,
            }}
          />
        );
      })}
    </div>
  );
};
