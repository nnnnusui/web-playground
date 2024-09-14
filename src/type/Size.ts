import { Position } from "./Position";

export type Size = {
  width: number;
  height: number;
};
export const Size = (() => {
  const init = (): Size => ({
    width: 1,
    height: 1,
  });
  return {
    init,
    from: (
      partialOrVal: Partial<Size> | number,
    ): Size => {
      const partial = typeof partialOrVal === "object"
        ? partialOrVal
        : {
          width: partialOrVal,
          height: partialOrVal,
        };
      return {
        ...init(),
        ...partial,
      };
    },
    toPosition: (size: Size): Position => ({
      x: size.width,
      y: size.height,
    }),
    fromPosition: (position: Position): Size => ({
      width: position.x,
      height: position.y,
    }),
  };
})();
