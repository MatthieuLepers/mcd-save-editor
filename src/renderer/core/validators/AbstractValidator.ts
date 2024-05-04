import Ajv from 'ajv';
// import i18n from '@renderer/plugins/i18n';

import { Items } from '@renderer/core/data/Content';
import ValidationErrorReport from '@renderer/core/validators/ValidationErrorReport';
import type { IItem } from '@renderer/core/classes/Item';
import { IEnchantment } from '../classes/Enchantment';

// const $get = (obj: any, query: string | Array<string>, defaultVal = null) => {
//   const regex = /^(.*)\[([0-9]+)\]$/;
//   const path = Array.isArray(query)
//     ? query
//     : query.split('.').reduce((acc, part) => (regex.test(part)
//       ? [...acc, part.replace(regex, '$1'), parseInt(part.replace(regex, '$2'), 10)]
//       : [...acc, part]
//     ), [] as Array<string | number>)
//   ;

//   if (!(path[0] in obj)) {
//     return defaultVal;
//   }
//   obj = obj[path[0]];
//   if (obj && path.length > 1) {
//     return $get(obj, path.toString().slice(1), defaultVal);
//   }
//   return obj;
// };

function $getEnchantmentChunks(item: IItem): Array<Array<IEnchantment>> {
  return (item.enchantments ?? []).reduce((acc, val, i) => {
    const ch = Math.floor(i / 3);
    acc[ch] = ([] as Array<IEnchantment>).concat((acc[ch] || []), val);
    return acc;
  }, [] as Array<Array<IEnchantment>>);
}

export default abstract class AbstractValidator<T> {
  public errors: Array<ValidationErrorReport> = [];

  constructor(public data: T) {
  }

  addErrorReport({ type, item, error }) {
    this.errors.push(new ValidationErrorReport(type, item, error));
  }

  isValid(): boolean {
    return !this.errors.length;
  }

  protected validateBySchema(schema: Object, item: IItem) {
    const ajv = new Ajv();
    const validate = ajv.compile(schema);
    const valid = validate(item);

    if (!valid) {
      console.log(validate.errors);
    }
  }

  protected validateItemType(item: IItem) {
    if (Items[item.type]) {
      if (Items[item.type].type === 'Armor' && !item.armorproperties) {
        // this.addErrorReport({
        //   type: 'type.armor',
        //   item,
        //   error: new ValidationError(i18n.global.t('MCD.DataCorruption.armorproperties.required', { itemType: Items[item.type].type.toLowerCase() }), item, undefined, ['armorproperties'], 'required', ''),
        // });
      }
      if (Items[item.type].type === 'Armor' && !item.enchantments) {
        // this.addErrorReport({
        //   type: 'type.armor',
        //   item,
        //   error: new ValidationError(i18n.global.t('MCD.DataCorruption.enchantments.required', { itemType: Items[item.type].type.toLowerCase() }), item, undefined, ['enchantments'], 'required', ''),
        // });
      }
      if ((Items[item.type].type === 'Melee' || Items[item.type].type === 'Ranged') && item.armorproperties) {
        // this.addErrorReport({
        //   type: 'type.weapon',
        //   item,
        //   error: new ValidationError(i18n.global.t('MCD.DataCorruption.armorproperties.forbbiden', { itemType: Items[item.type].type.toLowerCase() }), item, undefined, ['armorproperties'], 'forbbiden', ''),
        // });
      }
      if ((Items[item.type].type === 'Melee' || Items[item.type].type === 'Ranged') && !item.enchantments) {
        // this.addErrorReport({
        //   type: 'type.weapon',
        //   item,
        //   error: new ValidationError(i18n.global.t('MCD.DataCorruption.enchantments.required', { itemType: Items[item.type].type.toLowerCase() }), item, undefined, ['enchantments'], 'required', ''),
        // });
      }
      if (Items[item.type].type === 'Artefact') {
        if (item.armorproperties) {
          // this.addErrorReport({
          //   type: 'type.artefact',
          //   item,
          //   error: new ValidationError(i18n.global.t('MCD.DataCorruption.armorproperties.forbbiden', { itemType: Items[item.type].type.toLowerCase() }), item, undefined, ['armorproperties'], 'forbbiden', ''),
          // });
        }
        if (item.enchantments) {
          // this.addErrorReport({
          //   type: 'type.artefact',
          //   item,
          //   error: new ValidationError(i18n.global.t('MCD.DataCorruption.enchantments.forbbiden', { itemType: Items[item.type].type.toLowerCase() }), item, undefined, ['enchantments'], 'forbbiden', ''),
          // });
        }
        if (item.netheriteEnchant) {
          // this.addErrorReport({
          //   type: 'type.artefact',
          //   item,
          //   error: new ValidationError(i18n.global.t('MCD.DataCorruption.netheriteEnchant.forbbiden', { itemType: Items[item.type].type.toLowerCase() }), item, undefined, ['netheriteEnchant'], 'forbbiden', ''),
          // });
        }
      }
    }
  }

  protected validateEnchantmentChunks(item: IItem) {
    if (item.enchantments) {
      const enchantInvested = item.enchantments
        .filter((ench: IEnchantment) => ench.level > 0)
        .map((ench: IEnchantment) => ench.id)
      ;
      if (enchantInvested.includes('Unset')) {
        // this.addErrorReport({
        //   type: '',
        //   item,
        //   error: new ValidationError(i18n.global.t('MCD.DataCorruption.enchantments.noLeveledUnset'), item.enchantments, undefined, ['enchantments'], 'noLeveledUnset', 'enchantments'),
        // });
      }
      $getEnchantmentChunks(item).forEach((chunk, i) => {
        const enchantedItemInChunk = chunk.filter((ench) => ench.level > 0).length;
        if (enchantedItemInChunk > 1) {
          // this.addErrorReport({
          //   type: '',
          //   item,
          //   error: new ValidationError(i18n.global.t('MCD.DataCorruption.enchantments.chunks.levelConsistency', [i + 1]), item.enchantments, undefined, ['enchantments', 'chunks', i], 'levelConsistency', 'enchantments'),
          // });
        }
        const nonUniqueEnchantInChunk = chunk
          .map((ench) => ench.id)
          .filter((id, _i, arr) => arr.indexOf(id) !== i && id !== 'Unset')
        ;
        if (nonUniqueEnchantInChunk.length) {
          // this.addErrorReport({
          //   type: '',
          //   item,
          //   error: new ValidationError(i18n.global.t('MCD.DataCorruption.enchantments.chunks.uniqueChunkEnchant', [i + 1, ...nonUniqueEnchantInChunk]), item.enchantments, undefined, ['enchantments', 'chunks', i], 'uniqueChunkEnchant', 'enchantments'),
          // });
        }
      });
    }
  }

  protected validateNetheriteEnchant(item: IItem) {
    if (item.netheriteEnchant) {
      const enchantInvested = (item.enchantments ?? [])
        .filter((ench) => ench.level > 0)
        .map((ench) => ench.id)
      ;
      const nonUniqueNetheriteEnchant = enchantInvested.includes(item.netheriteEnchant.id);
      if (nonUniqueNetheriteEnchant) {
        // this.addErrorReport({
        //   type: '',
        //   item,
        //   error: new ValidationError(i18n.global.t('MCD.DataCorruption.netheriteEnchant.id.unique', [nonUniqueNetheriteEnchant]), item.enchantments, undefined, ['netheriteEnchant', 'id'], 'unique', 'netheriteEnchant'),
        // });
      }
    }
  }

  protected validateArmorProperties(item: IItem) {
    if (item.armorproperties) {
      const nonUniqueArmorProperties = item.armorproperties
        .map((armorproperty) => armorproperty.id)
        .filter((id, i, arr) => arr.indexOf(id) !== i)
      ;
      if (nonUniqueArmorProperties.length) {
        // this.addErrorReport({
        //   type: '',
        //   item,
        //   error: new ValidationError(i18n.global.t('MCD.DataCorruption.armorproperties.uniqueItemsId', nonUniqueArmorProperties), item.armorproperties, undefined, ['armorproperties'], 'uniqueItemsId', 'armorproperties'),
        // });
      }
    }
  }
}
