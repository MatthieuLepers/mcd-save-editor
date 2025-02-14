export default abstract class AbstractEntity<T extends Record<string, any>> {
  constructor(public data: T, ignoreMapping = [] as string[]) {
    Object.keys(data).forEach((key) => {
      if (!ignoreMapping.includes(key)) {
        Object.defineProperty(this, key, {
          get: () => this.data[key],
          set: (val) => { this.data[key as keyof T] = val; },
        });
      }
    });
  }
}
