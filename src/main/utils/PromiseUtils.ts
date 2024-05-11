export function serial<T>(funcs: Array<() => Promise<T>>): Promise<T[]> {
  return funcs.reduce((promise: Promise<T[]>, func: () => Promise<T>) => promise.then((result: T[]) => func().then(Array.prototype.concat.bind(result))), Promise.resolve([]));
}
