import InventoryValidator from '../validators/InventoryValidator';

/**
 * @author Matthieu LEPERS
 * @version 1.0.0
 */
export default class CharacterUtils {
  /**
   * @param {Number} lvl
   * @return {Number}
   */
  static getXpForLevel(lvl) {
    // eslint-disable-next-line no-nested-ternary
    const f = (x) => (x <= 1 ? 0 : (x === 2 ? 500 : f(x - 1) + 600));

    return f(lvl);
  }

  /**
   * @param {Number} lvl
   * @return {Number}
   */
  static level2Xp(lvl) {
    return [...Array(lvl + 1).keys()]
      .map(CharacterUtils.getXpForLevel)
      .reduce((acc, val) => acc + val, 0)
    ;
  }

  /**
   * @param {Number} xp
   * @return {Number}
   */
  static xp2Level(xp) {
    let level = 0;
    while (CharacterUtils.level2Xp(level) < xp) {
      level += 1;
    }
    return (CharacterUtils.level2Xp(level) === xp ? level : level - 1);
  }

  /**
   * @param {Object} data
   * @return {Boolean}
   */
  static isDataCorrupted(data) {
    const validator = new InventoryValidator(data);
    return validator.isValid();
  }

  /**
   * @param {Object} data
   * @return {ValidationError[]}
   */
  static getDataCorrupted(data) {
    const validator = new InventoryValidator(data);
    return validator.errors;
  }
}
