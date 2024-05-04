import type { ValidationError } from 'jsonschema';

import type Item from '@renderer/core/classes/Item';

export default class ValidationErrorReport {
  constructor(
    public type: String,
    public item: Item,
    public error: ValidationError,
  ) {}

  getLine() {
    const inst = JSON.stringify(this.item, null, 2).split('\n');
    const instance = JSON.stringify(this.error.instance, null, 2).split('\n');
    console.log(this.error, inst.findIndex((line) => line.includes(instance[0])));
    return '';
  }
}
