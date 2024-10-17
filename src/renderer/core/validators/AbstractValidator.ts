import Ajv from 'ajv';
import get from 'lodash.get';

import i18n from '@renderer/plugins/i18n';
import ValidationErrorReport from '@renderer/core/validators/ValidationErrorReport';
import { itemsStore } from '@renderer/core/entities/item/store';
import type { IGameItem } from '@renderer/core/entities/item/i';
import type { IGameEnchant } from '@renderer/core/entities/enchant/i';
import { chunkArray } from '@renderer/core/utils';

export default abstract class AbstractValidator<T> {
  public errors: Array<ValidationErrorReport> = [];

  constructor(public data: T) {
  }

  abstract get items(): Array<IGameItem>;

  addErrorReport({ item, error }) {
    this.errors.push(new ValidationErrorReport(item, this.items.indexOf(item), error));
  }

  isValid(): boolean {
    return !this.errors.length;
  }

  protected validateBySchema(schema: Object, item: IGameItem) {
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

  protected validateItemType(item: IGameItem) {
    if (itemsStore.items.value[item.type]) {
      if (itemsStore.items.value[item.type].type === 'Armor' && !item.armorproperties) {
        this.addErrorReport({
          item,
          error: {
            dataPath: 'armorproperties',
            keyword: 'required',
            message: i18n.global.t('MCD.DataCorruption.armorproperties.required', { itemType: itemsStore.items.value[item.type].type.toLowerCase() }),
            schemaPath: '#/$defs/item/properties/armorproperties/required',
          },
        });
      }
      if (itemsStore.items.value[item.type].type === 'Armor' && !item.enchantments) {
        this.addErrorReport({
          item,
          error: {
            dataPath: 'enchantments',
            keyword: 'required',
            message: i18n.global.t('MCD.DataCorruption.enchantments.required', { itemType: itemsStore.items.value[item.type].type.toLowerCase() }),
            schemaPath: '#/$defs/item/properties/enchantments/required',
          },
        });
      }
      if ((itemsStore.items.value[item.type].type === 'Melee' || itemsStore.items.value[item.type].type === 'Ranged') && item.armorproperties) {
        this.addErrorReport({
          item,
          error: {
            dataPath: 'armorproperties',
            keyword: 'forbbiden',
            message: i18n.global.t('MCD.DataCorruption.armorproperties.forbbiden', { itemType: itemsStore.items.value[item.type].type.toLowerCase() }),
            schemaPath: '#/$defs/item/properties/armorproperties/forbbiden',
          },
        });
      }
      if ((itemsStore.items.value[item.type].type === 'Melee' || itemsStore.items.value[item.type].type === 'Ranged') && !item.enchantments) {
        this.addErrorReport({
          item,
          error: {
            dataPath: 'enchantments',
            keyword: 'required',
            message: i18n.global.t('MCD.DataCorruption.enchantments.required', { itemType: itemsStore.items.value[item.type].type.toLowerCase() }),
            schemaPath: '#/$defs/item/properties/armorproperties/required',
          },
        });
      }
      if (itemsStore.items.value[item.type].type === 'Artefact') {
        if (item.armorproperties) {
          this.addErrorReport({
            item,
            error: {
              dataPath: 'armorproperties',
              keyword: 'forbbiden',
              message: i18n.global.t('MCD.DataCorruption.armorproperties.forbbiden', { itemType: itemsStore.items.value[item.type].type.toLowerCase() }),
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
              message: i18n.global.t('MCD.DataCorruption.enchantments.forbbiden', { itemType: itemsStore.items.value[item.type].type.toLowerCase() }),
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
              message: i18n.global.t('MCD.DataCorruption.netheriteEnchant.forbbiden', { itemType: itemsStore.items.value[item.type].type.toLowerCase() }),
              schemaPath: '#/$defs/item/properties/netheriteEnchant/forbbiden',
            },
          });
        }
      }
    }
  }

  protected validateEnchantmentChunks(item: IGameItem) {
    if (item.enchantments) {
      const enchantInvested = item.enchantments
        .filter((ench: IGameEnchant) => ench.level > 0)
        .map((ench: IGameEnchant) => ench.id)
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
      chunkArray(item.enchantments ?? [], 3).forEach((chunk, i) => {
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

  protected validateNetheriteEnchant(item: IGameItem) {
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

  protected validateArmorProperties(item: IGameItem) {
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
