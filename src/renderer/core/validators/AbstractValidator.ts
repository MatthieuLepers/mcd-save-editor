import Ajv from 'ajv';
import get from 'lodash.get';

import i18n from '@renderer/plugins/i18n';
import { Items } from '@renderer/core/data/Content';
import ValidationErrorReport from '@renderer/core/validators/ValidationErrorReport';
import type { IItem } from '@renderer/core/classes/Item';
import type { IEnchantment } from '@renderer/core/classes/Enchantment';

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

  abstract get items(): Array<IItem>;

  addErrorReport({ item, error }) {
    this.errors.push(new ValidationErrorReport(item, this.items.indexOf(item), error));
  }

  isValid(): boolean {
    return !this.errors.length;
  }

  protected validateBySchema(schema: Object, item: IItem) {
    const ajv = new Ajv({ allErrors: true });
    const validate = ajv.compile(schema);
    const valid = validate(item);
    if (!valid) {
      (validate.errors ?? [])
        .filter((error) => !['oneOf', 'not'].includes(error.keyword))
        .forEach((error) => {
          const value = get(item, error.dataPath.replace('.', ''));
          const errorCategory = error.dataPath.replaceAll(/\[[0-9]+\]/g, '').substring(1);
          // @ts-ignore
          const { missingProperty } = error.params;
          if (missingProperty) {
            error.message = i18n.global.t(`MCD.DataCorruption${errorCategory.length ? `.${errorCategory}` : ''}.${missingProperty}.${error.keyword}`);
            error.dataPath += `.${missingProperty}`;
          } else {
            error.message = i18n.global.t(`MCD.DataCorruption${errorCategory.length ? `.${errorCategory}` : ''}.${error.keyword}`, { value });
          }
          error.dataPath = error.dataPath.substring(1);

          this.addErrorReport({ item, error });
        })
      ;
    }
  }

  protected validateItemType(item: IItem) {
    if (Items[item.type]) {
      if (Items[item.type].type === 'Armor' && !item.armorproperties) {
        this.addErrorReport({
          item,
          error: {
            dataPath: 'armorproperties',
            keyword: 'required',
            message: i18n.global.t('MCD.DataCorruption.armorproperties.required', { itemType: Items[item.type].type.toLowerCase() }),
            schemaPath: '#/$defs/item/properties/armorproperties/required',
          },
        });
      }
      if (Items[item.type].type === 'Armor' && !item.enchantments) {
        this.addErrorReport({
          item,
          error: {
            dataPath: 'enchantments',
            keyword: 'required',
            message: i18n.global.t('MCD.DataCorruption.enchantments.required', { itemType: Items[item.type].type.toLowerCase() }),
            schemaPath: '#/$defs/item/properties/enchantments/required',
          },
        });
      }
      if ((Items[item.type].type === 'Melee' || Items[item.type].type === 'Ranged') && item.armorproperties) {
        this.addErrorReport({
          item,
          error: {
            dataPath: 'armorproperties',
            keyword: 'forbbiden',
            message: i18n.global.t('MCD.DataCorruption.armorproperties.forbbiden', { itemType: Items[item.type].type.toLowerCase() }),
            schemaPath: '#/$defs/item/properties/armorproperties/forbbiden',
          },
        });
      }
      if ((Items[item.type].type === 'Melee' || Items[item.type].type === 'Ranged') && !item.enchantments) {
        this.addErrorReport({
          item,
          error: {
            dataPath: 'enchantments',
            keyword: 'required',
            message: i18n.global.t('MCD.DataCorruption.enchantments.required', { itemType: Items[item.type].type.toLowerCase() }),
            schemaPath: '#/$defs/item/properties/armorproperties/required',
          },
        });
      }
      if (Items[item.type].type === 'Artefact') {
        if (item.armorproperties) {
          this.addErrorReport({
            item,
            error: {
              dataPath: 'armorproperties',
              keyword: 'forbbiden',
              message: i18n.global.t('MCD.DataCorruption.armorproperties.forbbiden', { itemType: Items[item.type].type.toLowerCase() }),
              schemaPath: '#/$defs/item/properties/armorproperties/forbbiden',
            },
          });
        }
        if (item.enchantments) {
          this.addErrorReport({
            item,
            error: {
              dataPath: 'enchantments',
              keyword: 'forbbiden',
              message: i18n.global.t('MCD.DataCorruption.enchantments.forbbiden', { itemType: Items[item.type].type.toLowerCase() }),
              schemaPath: '#/$defs/item/properties/enchantments/forbbiden',
            },
          });
        }
        if (item.netheriteEnchant) {
          this.addErrorReport({
            item,
            error: {
              dataPath: 'netheriteEnchant',
              keyword: 'forbbiden',
              message: i18n.global.t('MCD.DataCorruption.netheriteEnchant.forbbiden', { itemType: Items[item.type].type.toLowerCase() }),
              schemaPath: '#/$defs/item/properties/netheriteEnchant/forbbiden',
            },
          });
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
        this.addErrorReport({
          item,
          error: {
            dataPath: 'enchantments',
            keyword: 'noLeveledUnset',
            message: i18n.global.t('MCD.DataCorruption.enchantments.noLeveledUnset'),
            schemaPath: '#/$defs/item/properties/enchantments/noLeveledUnset',
          },
        });
      }
      $getEnchantmentChunks(item).forEach((chunk, i) => {
        const enchantedItemInChunk = chunk.filter((ench) => ench.level > 0).length;
        if (enchantedItemInChunk > 1) {
          this.addErrorReport({
            item,
            error: {
              dataPath: `enchantments.chunks[${i}]`,
              keyword: 'levelConsistency',
              message: i18n.global.t('MCD.DataCorruption.enchantments.chunks.levelConsistency', [i + 1]),
              schemaPath: '#/$defs/item/properties/enchantments/chunks/levelConsistency',
            },
          });
        }
        const nonUniqueEnchantInChunk = chunk
          .map((ench) => ench.id)
          .filter((id, index, arr) => arr.indexOf(id) !== index && id !== 'Unset')
        ;
        if (nonUniqueEnchantInChunk.length) {
          this.addErrorReport({
            item,
            error: {
              dataPath: `enchantments.chunks[${i}]`,
              keyword: 'uniqueChunkEnchant',
              message: i18n.global.t('MCD.DataCorruption.enchantments.chunks.uniqueChunkEnchant', [i + 1, ...nonUniqueEnchantInChunk]),
              schemaPath: '#/$defs/item/properties/enchantments/chunks/uniqueChunkEnchant',
            },
          });
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
        this.addErrorReport({
          item,
          error: {
            dataPath: 'netheriteEnchant.id',
            keyword: 'unique',
            message: i18n.global.t('MCD.DataCorruption.netheriteEnchant.id.unique', [nonUniqueNetheriteEnchant]),
            schemaPath: '#/$defs/item/properties/netheriteEnchant/id/unique',
          },
        });
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
        this.addErrorReport({
          item,
          error: {
            dataPath: 'armorproperties',
            keyword: 'uniqueItemsId',
            message: i18n.global.t('MCD.DataCorruption.armorproperties.uniqueItemsId', nonUniqueArmorProperties),
            schemaPath: '#/$defs/item/properties/armorproperties/uniqueItemsId',
          },
        });
      }
    }
  }
}
