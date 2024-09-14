import { PointerEvent, useState } from "react";

import { Calc } from "@/fn/objCalc";
import { Position } from "@/type/Position";

export const useDragInteraction = <T>({
  ...p
}: {
  onStart: (event: PointerEvent) => T;
  onUpdate: (updated: Updated<T>) => void;
}) => {
  const [progress, setProgress] = useState<"pressed" | "interact">();
  const [start, setStart] = useState<Start<T>>();

  const onPress = (event: PointerEvent<HTMLElement>) => {
    mayBePointerCaptured(event.currentTarget, event.pointerId);
    setProgress("pressed");
    setStart({
      event,
      value: p.onStart(event),
    });
  };

  const onMove = (event: PointerEvent<HTMLElement>) => {
    if (start == null) return;
    setProgress("interact");
    p.onUpdate({
      start,
      event,
      diff: Calc["-"](
        positionFromEvent(event),
        positionFromEvent(start.event),
      ),
    });
  };

  const onRelease = (event: PointerEvent<HTMLElement>) => {
    if (start != null && progress === "interact")
      p.onUpdate({
        start,
        event,
        diff: Calc["-"](
          positionFromEvent(event),
          positionFromEvent(start.event),
        ),
      });
    setProgress(undefined);
    setStart(undefined);
  };

  return {
    onPress,
    onMove,
    onRelease,
  };
};

type Start<T> = {
  event: PointerEvent;
  value: T;
};
type Updated<T> = {
  start: Start<T>;
  event: PointerEvent;
  diff: Position;
};

const positionFromEvent = (event: PointerEvent<Element>) =>
  Position.from({
    x: event.clientX,
    y: event.clientY,
  });

const mayBePointerCaptured = (element: Element, pointerId: number) => {
  try { element.setPointerCapture(pointerId); }
  catch {
    const details = {
      pointerId,
      elementIsExists: element != null,
    };
    console.error("pointer capture failured:", details);
  };
};
