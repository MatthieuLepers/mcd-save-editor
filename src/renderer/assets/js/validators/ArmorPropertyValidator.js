import AbstractValidator from './AbstractValidator';

import { ArmorProperties } from '../data/Content';
import RarityEnum from '../classes/enums/RarityEnum';

/**
 * @return {Boolean}
 */
function $validateKeys() {
  return this.keysValidator(['id', 'rarity']);
}

/**
 * @return {Boolean}
 */
function $validateId() {
  return typeof this.data.id === 'string'
    && !!ArmorProperties[this.data.id]
  ;
}

/**
 * @return {Boolean}
 */
function $validateRarity() {
  return typeof this.data.rarity === 'string'
    && RarityEnum.list.indexOf(this.data.rarity) >= 0
  ;
}

/**
 * @author Matthieu LEPERS
 * @version 1.0.0
 */
export default class EnchantmentValidator extends AbstractValidator {
  /**
   * @return {String}
   */
  get identifier() {
    return this.data.id || 'Unknown armor property';
  }

  /**
   * @inheritdoc
   */
  isValid() {
    return super.isValid()
      && $validateKeys.call(this)
      && $validateId.call(this)
      && $validateRarity.call(this)
    ;
  }

  /**
   * @return {Boolean}
   */
  seemsValid() {
    return super.isValid()
      && $validateKeys.call(this)
      && $validateRarity.call(this)
    ;
  }
}
