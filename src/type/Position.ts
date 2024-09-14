export type Position = {
  x: number;
  y: number;
};
export const Position = (() => {
  const init = (): Position => ({
    x: 0,
    y: 0,
  });

  return {
    init,
    from: (
      partialOrVal: Partial<Position> | number,
    ): Position => {
      const partial = typeof partialOrVal === "object"
        ? partialOrVal
        : {
          x: partialOrVal,
          y: partialOrVal,
        };
      return {
        ...init(),
        ...partial,
      };
    },
  };
})();
