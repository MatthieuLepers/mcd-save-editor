import InventoryValidator from '@renderer/core/validators/InventoryValidator';
import type ValidationErrorReport from '@renderer/core/validators/ValidationErrorReport';
import type { ICharacter } from '@renderer/core/classes/Character';

export default class CharacterUtils {
  static getXpForLevel(lvl: number): number {
    // eslint-disable-next-line no-nested-ternary
    const f = (x) => (x <= 1 ? 0 : (x === 2 ? 500 : f(x - 1) + 600));

    return f(lvl);
  }

  static level2Xp(lvl: number): number {
    return [...Array(lvl + 1).keys()]
      .map(CharacterUtils.getXpForLevel)
      .reduce((acc, val) => acc + val, 0)
    ;
  }

  static xp2Level(xp: number): number {
    let level = 0;
    while (CharacterUtils.level2Xp(level) < xp) {
      level += 1;
    }
    return (CharacterUtils.level2Xp(level) === xp ? level : level - 1);
  }

  static isDataCorrupted(data: ICharacter): boolean {
    const validator = new InventoryValidator(data);
    return validator.isValid();
  }

  static getDataCorrupted(data: ICharacter): Array<ValidationErrorReport> {
    const validator = new InventoryValidator(data);
    return validator.errors;
  }
}
