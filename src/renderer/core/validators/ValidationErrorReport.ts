import type { ErrorObject } from 'ajv';
import get from 'lodash.get';

import type { IGameItem } from '@renderer/core/entities/item/i';
import Fixup from '@renderer/core/classes/Fixup';

export default class ValidationErrorReport {
  constructor(
    public item: IGameItem,
    public itemIndex: number,
    public error: ErrorObject,
  ) {}

  get instance() {
    return JSON.stringify(this.item, null, 2);
  }

  get value() {
    if (this.error.dataPath.includes('chunks')) {
      const chunk = parseInt(this.error.dataPath.replace(/.*chunks\[([0-2])\].*/, '$1'), 10);
      return (this.item.enchantments ?? []).slice(chunk, chunk + 3);
    }
    return get(this.item, this.error.dataPath);
  }

  getLine(): string {
    if (this.error.dataPath.includes('chunks')) {
      const regex = new RegExp(JSON
        .stringify(this.value)
        .replace('[', '')
        .replace(']', '')
        .replaceAll('{', '\\{\\s+')
        .replaceAll('":', '": ')
        .replaceAll(',"', ',\\s+"')
        .replaceAll('}', '\\s+\\}')
        .replaceAll('\\},\\{', '\\},\\s+\\{'), 'gm')
      ;
      const [match] = this.instance.match(regex)!;
      const from = this.instance.search(regex);
      const to = from + match.length;

      return `${this.instance.substring(0, from).split('\n').length} to ${this.instance.substring(0, to).split('\n').length}`;
    }
    return `${this.instance.split('\n').findIndex((line) => line.includes(JSON.stringify(this.value, null, 2))) + 1}`;
  }

  getFixup() {
    return new Fixup(this).getFixup();
  }
}
