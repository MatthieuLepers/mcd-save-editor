import ArmorPropertyValidator from './ArmorPropertyValidator';
import { Items } from '../data/Content';

/**
 * @return {Boolean}
 */
function $validateList() {
  return this.list
    .reduce((acc, propertyData) => acc && new ArmorPropertyValidator(propertyData, this.$corruptionData).isValid(), true)
  ;
}

/**
 * @return {Boolean}
 */
function $validateMysteryArmor() {
  return this.itemId === 'MysteryArmor'
    ? this.list.length >= 1
    : true
  ;
}

/**
 * @return {Boolean}
 */
function $validateNonMysteryArmor() {
  return this.itemId !== 'MysteryArmor'
    ? this.list.length === this.itemData.armorproperties.length
    : true
  ;
}

/**
 * @return {Boolean}
 */
function $validateEachProperties() {
  return this.list
    .reduce((acc, propertyData) => acc && this.itemData.armorproperties.indexOf(propertyData.id) >= 0, true)
  ;
}

/**
 * @author Matthieu LEPERS
 * @version 1.0.0
 */
export default class ArmorPropertyListValidator {
  /**
   * @param {Array} list
   * @param {String} itemId
   * @param {String[]} corruptionData
   */
  constructor(list, itemId, corruptionData = []) {
    this.list = list;
    this.itemId = itemId;
    this.itemData = Items[this.itemId];
    this.$corruptionData = corruptionData;
  }

  /**
   * @inheritdoc
   */
  isValid() {
    return $validateList.call(this)
      && $validateMysteryArmor.call(this)
      && $validateNonMysteryArmor.call(this)
      && $validateEachProperties.call(this)
    ;
  }
}
