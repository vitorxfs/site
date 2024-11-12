export function toSorted<T = unknown>(array: Array<T>, cb: (a: T, b: T) => number): T[] {
  return array.sort(cb);
}
