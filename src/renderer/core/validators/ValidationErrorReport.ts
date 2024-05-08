import type Item from '@renderer/core/classes/Item';
import type { ErrorObject } from 'ajv';
import get from 'lodash.get';

export default class ValidationErrorReport {
  constructor(
    public item: Item,
    public error: ErrorObject,
  ) {}

  getLine(): number {
    const inst = JSON.stringify(this.item, null, 2).split('\n');
    const value = get(this.item, this.error.dataPath.replace('.', ''));
    return inst.findIndex((line) => line.includes(value));
  }
}
