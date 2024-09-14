type CalculableObj = Record<PropertyKey, number>;
const getCalc = (
  calc: (lhs: number, rhs: number) => number,
) => <
  T extends CalculableObj,
>(lhs: T, rhs: T | number) =>
  Object.fromEntries(
    Object.entries(lhs)
      .map(([key, lVal]) => {
        if (typeof lVal !== "number") return [key, lVal];
        const rVal = typeof rhs === "object"
          ? rhs[key]
          : rhs;
        if (typeof rVal !== "number") return [key, lVal];
        return [key, calc(lVal, rVal)];
      }),
  ) as T;

export const Calc = (() => {
  const plus = getCalc((lhs, rhs) => lhs + rhs);
  const minus = getCalc((lhs, rhs) => lhs - rhs);
  const times = getCalc((lhs, rhs) => lhs * rhs);
  const div = getCalc((lhs, rhs) => lhs / rhs);
  return {
    get: getCalc,
    "+": plus,
    "-": minus,
    "*": times,
    "/": div,
    max: getCalc((lhs, rhs) => Math.max(lhs, rhs)),
    min: getCalc((lhs, rhs) => Math.min(lhs, rhs)),
    positiveDiff: getCalc((lhs, rhs) => Math.max(lhs, rhs) - Math.min(lhs, rhs)),
    opposite: <
      T extends CalculableObj,
    >(lhs: T) => times(lhs, -1),
    orElse: (
      condition: (lhs: number) => boolean,
    ) => getCalc((lhs, rhs) =>
      condition(lhs) ? lhs : rhs,
    ),
  };
})();
