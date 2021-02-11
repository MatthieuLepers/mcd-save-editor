import AbstractValidator from './AbstractValidator';
import EnchantmentsData from '../data/Enchants';

/**
 * @return {Boolean}
 */
function $validateKeys() {
  return this.$keys.length === 2
    && this.hasKeys('id', 'level')
  ;
}

/**
 * @return {Boolean}
 */
function $validateId() {
  return typeof this.data.id === 'string'
    && !!EnchantmentsData[this.data.id]
  ;
}

/**
 * @return {Boolean}
 */
function $validateLevel() {
  return typeof this.data.level === 'number'
    && (this.data.level === 0 || this.data.level <= 3)
  ;
}

/**
 * @author Matthieu LEPERS
 * @version 1.0.0
 */
export default class EnchantmentValidator extends AbstractValidator {
  /**
   * @inheritdoc
   */
  isValid() {
    return $validateKeys.call(this)
      && $validateId.call(this)
      && $validateLevel.call(this)
    ;
  }
}