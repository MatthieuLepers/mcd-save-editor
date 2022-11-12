import { Validator, ValidationError } from 'jsonschema';
import { Items } from '../data/Content';
import i18n from '@/plugins/i18n';

/**
 * @param {Object} obj
 * @param {String|Array} query
 * @param {any} defaultVal
 * @return {any|null}
 */
const $get = (obj, query, defaultVal = null) => {
  const regex = /^(.*)\[([0-9]+)\]$/;
  const path = Array.isArray(query)
    ? query
    : query.split('.').reduce((acc, part) => (regex.test(part)
      ? [...acc, part.replace(regex, '$1'), parseInt(part.replace(regex, '$2'), 10)]
      : [...acc, part]
    ), [])
  ;

  if (!(path[0] in obj)) {
    return defaultVal;
  }
  obj = obj[path[0]];
  if (obj && path.length > 1) {
    return $get(obj, path.slice(1), defaultVal);
  }
  return obj;
};

/**
 * @param {Object} schema
 * @param {Object} item
 */
export const validateBySchema = function validateBySchema(schema, item) {
  const validator = new Validator();
  const validationResult = validator.validate(item, schema);

  if (!validationResult.valid) {
    validationResult.errors.forEach((error) => {
      const errorPath = error.path.filter((part) => typeof part === 'string').join('.');
      const argument = error.name === 'required' ? `.${error.argument}` : '';
      const path = errorPath.length ? `.${errorPath}` : '';

      error.message = i18n.t(`MCD.DataCorruption${path}${argument}.${error.name}`, {
        itemType: Items[item.type]?.type?.toLowerCase(),
        value: $get(item, error.property.replace('instance.', '')),
      });
      this.addErrorReport({
        item,
        error,
      });
    });
  }
};

/**
 * @param {Object} item
 */
export const validateItemType = function validateItemType(item) {
  if (Items[item.type]) {
    if (Items[item.type].type === 'Armor' && !item.armorproperties) {
      this.addErrorReport({
        item,
        error: new ValidationError(i18n.t('MCD.DataCorruption.armorproperties.required', { itemType: Items[item.type].type.toLowerCase() }), item, null, ['armorproperties'], 'required', ''),
      });
    }
    if (Items[item.type].type === 'Armor' && !item.enchantments) {
      this.addErrorReport({
        item,
        error: new ValidationError(i18n.t('MCD.DataCorruption.enchantments.required', { itemType: Items[item.type].type.toLowerCase() }), item, null, ['enchantments'], 'required', ''),
      });
    }
    if ((Items[item.type].type === 'Melee' || Items[item.type].type === 'Ranged') && item.armorproperties) {
      this.addErrorReport({
        item,
        error: new ValidationError(i18n.t('MCD.DataCorruption.armorproperties.forbbiden', { itemType: Items[item.type].type.toLowerCase() }), item, null, ['armorproperties'], 'forbbiden', ''),
      });
    }
    if ((Items[item.type].type === 'Melee' || Items[item.type].type === 'Ranged') && !item.enchantments) {
      this.addErrorReport({
        item,
        error: new ValidationError(i18n.t('MCD.DataCorruption.enchantments.required', { itemType: Items[item.type].type.toLowerCase() }), item, null, ['enchantments'], 'required', ''),
      });
    }
    if (Items[item.type].type === 'Artefact') {
      if (item.armorproperties) {
        this.addErrorReport({
          item,
          error: new ValidationError(i18n.t('MCD.DataCorruption.armorproperties.forbbiden', { itemType: Items[item.type].type.toLowerCase() }), item, null, ['armorproperties'], 'forbbiden', ''),
        });
      }
      if (item.enchantments) {
        this.addErrorReport({
          item,
          error: new ValidationError(i18n.t('MCD.DataCorruption.enchantments.forbbiden', { itemType: Items[item.type].type.toLowerCase() }), item, null, ['enchantments'], 'forbbiden', ''),
        });
      }
      if (item.netheriteEnchant) {
        this.addErrorReport({
          item,
          error: new ValidationError(i18n.t('MCD.DataCorruption.netheriteEnchant.forbbiden', { itemType: Items[item.type].type.toLowerCase() }), item, null, ['netheriteEnchant'], 'forbbiden', ''),
        });
      }
    }
  }
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
    if (enchantInvested.includes('Unset')) {
      this.addErrorReport({
        item,
        error: new ValidationError(i18n.t('MCD.DataCorruption.enchantments.noLeveledUnset'), item.enchantments, null, ['enchantments'], 'noLeveledUnset', 'enchantments'),
      });
    }
    $getEnchantmentChunks(item).forEach((chunk, i) => {
      const enchantedItemInChunk = chunk.filter((ench) => ench.level > 0).length;
      if (enchantedItemInChunk > 1) {
        this.addErrorReport({
          item,
          error: new ValidationError(i18n.t('MCD.DataCorruption.enchantments.chunks.levelConsistency', [i + 1]), item.enchantments, null, ['enchantments', 'chunks', i], 'levelConsistency', 'enchantments'),
        });
      }
      const nonUniqueEnchantInChunk = chunk
        .map((ench) => ench.id)
        .filter((id, i, arr) => arr.indexOf(id) !== i && id !== 'Unset')
      ;
      if (nonUniqueEnchantInChunk.length) {
        this.addErrorReport({
          item,
          error: new ValidationError(i18n.t('MCD.DataCorruption.enchantments.chunks.uniqueChunkEnchant', [i + 1, ...nonUniqueEnchantInChunk]), item.enchantments, null, ['enchantments', 'chunks', i], 'uniqueChunkEnchant', 'enchantments'),
        });
      }
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
    const nonUniqueNetheriteEnchant = enchantInvested.includes(item.netheriteEnchant.id);
    if (nonUniqueNetheriteEnchant) {
      this.addErrorReport({
        item,
        error: new ValidationError(i18n.t('MCD.DataCorruption.netheriteEnchant.id.unique', [nonUniqueNetheriteEnchant]), item.enchantments, null, ['netheriteEnchant', 'id'], 'unique', 'netheriteEnchant'),
      });
    }
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
    if (nonUniqueArmorProperties.length) {
      this.addErrorReport({
        item,
        error: new ValidationError(i18n.t('MCD.DataCorruption.armorproperties.uniqueItemsId'), nonUniqueArmorProperties, item.armorproperties, null, ['armorproperties'], 'uniqueItemsId', 'armorproperties'),
      });
    }
  }
};
