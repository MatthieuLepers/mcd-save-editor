import { Validator } from 'jsonschema';
import { Items } from '../../../renderer/assets/js/data/Content';

export const validateBySchema = function validateBySchema(schema, item) {
  const validator = new Validator();
  const validationResult = validator.validate(item, schema);

  this.corrupted = this.corrupted || !validationResult.valid;
};

/**
 * @param {Object} item
 */
export const validateItemType = function validateItemType(item) {
  this.corrupted = this.corrupted
    || (Items[item.type].type === 'Armor' && (!item.armorproperties || !item.enchantments))
    || ((Items[item.type].type === 'Melee' || Items[item.type].type === 'Ranged') && (item.armorproperties || !item.enchantments))
    || (Items[item.type].type === 'Artefact' && (item.armorproperties || item.enchantments || item.netheriteEnchant))
  ;
};

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
export const validateEnchantmentChunks = function validateEnchantmentChunks(item) {
  if (item.enchantments) {
    const enchantInvested = item.enchantments
      .filter((ench) => ench.level > 0)
      .map((ench) => ench.id)
    ;
    this.corrupted = this.corrupted || enchantInvested.includes('Unset');
    $getEnchantmentChunks(item).forEach((chunk) => {
      const enchantedItemInChunk = chunk.filter((ench) => ench.level > 0).length;
      const nonUniqueEnchantInChunk = chunk
        .map((ench) => ench.id)
        .filter((id, i, arr) => arr.indexOf(id) !== i && id !== 'Unset')
      ;
      this.corrupted = this.corrupted || enchantedItemInChunk > 1 || !!nonUniqueEnchantInChunk.length;
    });
  }
};

/**
 * @param {Object} item
 */
export const validateNetheriteEnchant = function validateNetheriteEnchant(item) {
  if (this.netheriteEnchant) {
    const enchantInvested = item.enchantments
      .filter((ench) => ench.level > 0)
      .map((ench) => ench.id)
    ;
    this.corrupted = this.corrupted || enchantInvested.includes(item.netheriteEnchant.id);
  }
};

/**
 * @param {Object} item
 */
export const validateArmorProperties = function validateArmorProperties(item) {
  if (item.armorproperties) {
    const nonUniqueArmorProperties = item.armorproperties
      .map((armorproperty) => armorproperty.id)
      .filter((id, i, arr) => arr.indexOf(id) !== i)
    ;
    this.corrupted = this.corrupted || !!nonUniqueArmorProperties.length;
  }
};
