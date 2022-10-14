import { Validator } from 'jsonschema';
import ItemSchema from '../../../../static/json/schemas/item.schema.json';
import { Items } from '../../../renderer/assets/js/data/Content';

function validateBySchema(schema, item) {
  const validator = new Validator();
  const validationResult = validator.validate(item, schema);

  this.corrupted = !validationResult.valid;
}

/**
 * @param {Object} item
 */
function validateItemType(item) {
  this.corrupted = (Items[item.type].type === 'Armor' && (!item.armorproperties || !item.enchantments))
    || ((Items[item.type].type === 'Melee' || Items[item.type].type === 'Ranged') && (item.armorproperties || !item.enchantments))
    || (Items[item.type].type === 'Artefact' && (item.armorproperties || item.enchantments || item.netheriteEnchant))
  ;
}

/**
 * @param {Object} item
 * @return {Object[][]}
 */
function $getEnchantmentChunks(item) {
  return item.enchantments.reduce((acc, val, i) => {
    const ch = Math.floor(i / 3);
    acc[ch] = [].concat((acc[ch] || []), val);
    return acc;
  }, []);
}

/**
 * @param {Object} item
 */
function validateEnchantmentChunks(item) {
  if (item.enchantments) {
    $getEnchantmentChunks(item).forEach((chunk) => {
      const enchantedItemInChunk = chunk.filter((ench) => ench.level > 0).length;
      const nonUniqueEnchantInChunk = chunk
        .map((ench) => ench.id)
        .filter((id, i, arr) => arr.indexOf(id) !== i && id !== 'Unset')
      ;
      this.corrupted = enchantedItemInChunk > 1 || !!nonUniqueEnchantInChunk.length;
    });
  }
}

/**
 * @param {Object} item
 */
function validateArmorProperties(item) {
  if (item.armorproperties) {
    const nonUniqueArmorProperties = item.armorproperties
      .map((armorproperty) => armorproperty.id)
      .filter((id, i, arr) => arr.indexOf(id) !== i)
    ;
    this.corrupted = !!nonUniqueArmorProperties.length;
  }
}

export default class InventoryValidator {
  /**
   * @constructor
   * @param {Object} data
   */
  constructor(data) {
    this.data = data;
    this.corrupted = false;

    this.data.items.forEach((item) => {
      validateBySchema.call(this, ItemSchema, item);
      validateItemType.call(this, item);
      validateEnchantmentChunks.call(this, item);
      validateArmorProperties.call(this, item);
    });
  }

  /**
   * @return {Boolean}
   */
  isValid() {
    return !this.corrupted;
  }
}
