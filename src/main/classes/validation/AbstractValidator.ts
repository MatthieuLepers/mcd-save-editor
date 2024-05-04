import Ajv from 'ajv';

import { Items } from '@renderer/core/data/Content';

function getEnchantmentChunks(item) {
  return item.enchantments.reduce((acc, val, i) => {
    const ch = Math.floor(i / 3);
    acc[ch] = [].concat((acc[ch] || []), val);
    return acc;
  }, []);
}

export default abstract class AbstractValidator {
  public corrupted: boolean = false;

  public errors: Array<string> = [];

  constructor(public data: any) {
  }

  validateBySchema(schema: Object, item) {
    const ajv = new Ajv();
    const validate = ajv.compile(schema);
    const valid = validate(item);

    this.corrupted = this.corrupted || !valid;
  }

  validateItemType(item) {
    this.corrupted = this.corrupted
      || (Items[item.type].type === 'Armor' && (!item.armorproperties || !item.enchantments))
      || ((Items[item.type].type === 'Melee' || Items[item.type].type === 'Ranged') && (item.armorproperties || !item.enchantments))
      || (Items[item.type].type === 'Artefact' && (item.armorproperties || item.enchantments || item.netheriteEnchant))
    ;
  }

  validateEnchantmentChunks(item) {
    if (item.enchantments) {
      const enchantInvested = item.enchantments
        .filter((ench) => ench.level > 0)
        .map((ench) => ench.id)
      ;
      this.corrupted = this.corrupted || enchantInvested.includes('Unset');
      getEnchantmentChunks(item).forEach((chunk) => {
        const enchantedItemInChunk = chunk.filter((ench) => ench.level > 0).length;
        const nonUniqueEnchantInChunk = chunk
          .map((ench) => ench.id)
          .filter((id, i, arr) => arr.indexOf(id) !== i && id !== 'Unset')
        ;
        this.corrupted = this.corrupted || enchantedItemInChunk > 1 || !!nonUniqueEnchantInChunk.length;
      });
    }
  }

  validateNetheriteEnchant(item) {
    if (item.netheriteEnchant) {
      const enchantInvested = item.enchantments
        .filter((ench) => ench.level > 0)
        .map((ench) => ench.id)
      ;
      this.corrupted = this.corrupted || enchantInvested.includes(item.netheriteEnchant.id);
    }
  }

  validateArmorProperties(item) {
    if (item.armorproperties) {
      const nonUniqueArmorProperties = item.armorproperties
        .map((armorproperty) => armorproperty.id)
        .filter((id, i, arr) => arr.indexOf(id) !== i)
      ;
      this.corrupted = this.corrupted || !!nonUniqueArmorProperties.length;
    }
  }

  isValid(): boolean {
    return !this.corrupted;
  }
}
