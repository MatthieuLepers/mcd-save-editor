import ItemValidator from '../validators/ItemValidator';

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
    return !data.items.reduce((acc, item) => {
      const itemValidator = new ItemValidator(item);
      return acc && (itemValidator.isValid() || itemValidator.seemsValid());
    }, true);
  }

  /**
   * @param {Object} data
   * @return {Object[]}
   */
  static getDataCorrupted(data) {
    const corruptedItems = [];
    data.items.forEach((item) => {
      const itemValidator = new ItemValidator(item);
      if (!itemValidator.isValid() || !itemValidator.seemsValid()) {
        corruptedItems.push({ item, messages: itemValidator.$corruptionData });
      }
    });

    return corruptedItems;
  }
}
