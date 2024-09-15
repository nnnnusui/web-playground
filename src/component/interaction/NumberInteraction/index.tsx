import clsx from "clsx";
import {
  ReactNode,
  useState,
} from "react";

import { State } from "@/type/State";
import { useDragInteraction } from "../base/useDragInteraction";

import styles from "./NumberInteraction.module.scss";

export const NumberInteraction = ({
  label,
  state: [state, setState],
}: {
  label: string;
  state: State<number>;
}): ReactNode => {
  const [input, setInput] = useState<string>();

  const confirm = (value: string) => {
    setInput(undefined);
    setState(Number(value));
  };

  const step = 0.01;
  const drag = useDragInteraction({
    onStart: () => state,
    onUpdate: (updated) => setState(updated.start.value + updated.diff.y * step),
  });

  return (
    <div className={clsx(styles.NumberInteraction)}
      data-testid={"container"}
      onPointerDown={drag.onPress}
      onPointerMove={drag.onMove}
      onPointerUp={drag.onRelease}
    >
      {label}
      <input className={clsx(styles.Value)}
        data-testid={"text"}
        type="number"
        value={input ?? state != null ? `${Math.round(state * 100) / 100}` : ""}
        placeholder={label}
        onChange={(event) => {
          if (state === Number(event.currentTarget.value)) return;
          setInput(event.currentTarget.value);
        }}
        onBlur={(event) => confirm(event.currentTarget.value)}
      />
    </div>
  );
};
