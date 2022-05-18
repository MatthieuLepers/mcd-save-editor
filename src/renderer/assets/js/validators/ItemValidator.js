import AbstractValidator from './AbstractValidator';
import ArmorPropertyListValidator from './ArmorPropertyListValidator';
import EnchantmentListValidator from './EnchantmentListValidator';
import EnchantmentValidator from './EnchantmentValidator';

import { Items } from '../data/Content';
import RarityEnum from '../classes/enums/RarityEnum';
import EquipmentSlotEnum from '../classes/enums/EquipmentSlotEnum';

/**
 * @return {Boolean}
 */
function $validateKeys() {
  return this.$keys.length >= 4
    && this.$keys.length <= 8
    && (this.hasKeys('equipmentSlot', '!inventoryIndex') || this.hasKeys('!equipmentSlot', 'inventoryIndex'))
    && this.hasKeys('power', 'rarity', 'type', 'upgraded')
  ;
}

/**
 * @return {Boolean}
 */
function $validateArmorProperties() {
  return this.hasKeys('armorproperties')
    && Array.isArray(this.data.armorproperties)
    && new ArmorPropertyListValidator(this.data.armorproperties, this.data.type).isValid()
  ;
}

/**
 * @return {Boolean}
 */
function $validateEnchantments() {
  return this.hasKeys('enchantments')
    && Array.isArray(this.data.enchantments)
    && new EnchantmentListValidator(this.data.enchantments).isValid()
  ;
}

/**
 * @return {Boolean}
 */
function $validateGifted() {
  return (this.hasKeys('gifted') && this.data.gifted) || !this.hasKeys('gifted');
}

/**
 * @return {Boolean}
 */
function $validateEquipmentSlot() {
  return this.hasKeys('equipmentSlot')
    ? typeof this.data.equipmentSlot === 'string' && EquipmentSlotEnum.list.indexOf(this.data.equipmentSlot) >= 0
    : true
  ;
}

/**
 * @return {Boolean}
 */
function $validateInventoryIndex() {
  return this.hasKeys('inventoryIndex')
    ? typeof this.data.inventoryIndex === 'number' && this.data.inventoryIndex >= 0
    : true
  ;
}

/**
 * @return {Boolean}
 */
function $validateNetheriteEnchant() {
  return this.hasKeys('netheriteEnchant')
    ? typeof this.data.netheriteEnchant === 'object' && new EnchantmentValidator(this.data.netheriteEnchant).isValid()
    : true
  ;
}

/**
 * @return {Boolean}
 */
function $validateMarkedNew() {
  return this.hasKeys('markedNew')
    ? (typeof this.data.markedNew === 'boolean' && this.data.markedNew)
    : true
  ;
}

/**
 * @return {Boolean}
 */
function $validatePower() {
  return typeof this.data.power === 'number'
    && this.data.power > 0
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
 * @return {Boolean}
 */
function $validateType() {
  return typeof this.data.type === 'string'
    && !!Items[this.data.type]
    && (
      (Items[this.data.type].type === 'Armor' && $validateArmorProperties.call(this) && $validateEnchantments.call(this))
      || (Items[this.data.type].type === 'Melee' && this.hasKeys('!armorproperties') && $validateEnchantments.call(this))
      || (Items[this.data.type].type === 'Ranged' && this.hasKeys('!armorproperties') && $validateEnchantments.call(this))
      || (Items[this.data.type].type === 'Artefact' && this.hasKeys('!enchantments', '!netheriteEnchant', '!armorproperties'))
    )
  ;
}

/**
 * @return {Boolean}
 */
function $validateUpgraded() {
  return typeof this.data.upgraded === 'boolean'
    && !this.data.upgraded
  ;
}

/**
 * @author Matthieu LEPERS
 * @version 1.0.0
 */
export default class ItemValidator extends AbstractValidator {
  /**
   * @inheritdoc
   */
  isValid() {
    return super.isValid()
      && $validateKeys.call(this)
      && $validateGifted.call(this)
      && $validateEquipmentSlot.call(this)
      && $validateInventoryIndex.call(this)
      && $validateNetheriteEnchant.call(this)
      && $validateMarkedNew.call(this)
      && $validatePower.call(this)
      && $validateRarity.call(this)
      && $validateType.call(this)
      && $validateUpgraded.call(this)
    ;
  }

  /**
   * @return {Boolean}
   */
  seemsValid() {
    return super.isValid()
      && $validateKeys.call(this)
      && $validateGifted.call(this)
      && $validateEquipmentSlot.call(this)
      && $validateInventoryIndex.call(this)
      && $validateNetheriteEnchant.call(this)
      && $validateMarkedNew.call(this)
      && $validatePower.call(this)
      && $validateRarity.call(this)
      && $validateUpgraded.call(this)
    ;
  }
}
