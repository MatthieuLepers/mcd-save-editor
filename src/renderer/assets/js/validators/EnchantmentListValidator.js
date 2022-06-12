import EnchantmentValidator from './EnchantmentValidator';

/**
 * @return {Boolean}
 */
function $validateList() {
  return this.list.length === 9
    && this.list.reduce((acc, enchData) => acc && new EnchantmentValidator(enchData, this.$corruptionData).isValid(), true)
  ;
}

/**
 * @return {Boolean}
 */
function $validateChunkMaxEnchantmentLevel() {
  return this.chunks
    .map((chunk) => chunk.reduce((acc, enchData) => enchData.level + acc, 0) <= 3)
    .reduce((acc, val) => val && acc, true)
  ;
}

/**
 * @return {Boolean}
 */
function $validateChunkUniqueEnchantmentLevelNonZero() {
  return this.chunks
    .reduce((acc, chunk) => acc && [0, 1].indexOf(chunk.filter((enchData) => enchData.level > 0).length) >= 0, true)
  ;
}

/**
 * @author Matthieu LEPERS
 * @version 1.0.0
 */
export default class EnchantmentListValidator {
  /**
   * @param {Array} list
   * @param {String[]} corruptionData
   */
  constructor(list, corruptionData = []) {
    this.list = list;
    this.chunks = this.list.reduce((acc, val, i) => {
      const ch = Math.floor(i / 3);
      acc[ch] = [].concat((acc[ch] || []), val);
      return acc;
    }, []);
    this.$corruptionData = corruptionData;
  }

  /**
   * @inheritdoc
   */
  isValid() {
    return $validateList.call(this)
      && $validateChunkMaxEnchantmentLevel.call(this)
      && $validateChunkUniqueEnchantmentLevelNonZero.call(this)
    ;
  }
}
