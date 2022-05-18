import AbstractValidator from './AbstractValidator';
import { Enchants } from '../data/Content';

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
    && !!Enchants[this.data.id]
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
    return super.isValid()
      && $validateKeys.call(this)
      && $validateId.call(this)
      && $validateLevel.call(this)
    ;
  }

  /**
   * @return {Boolean}
   */
  seemsValid() {
    return super.isValid()
      && $validateKeys.call(this)
      && $validateLevel.call(this)
    ;
  }
}
