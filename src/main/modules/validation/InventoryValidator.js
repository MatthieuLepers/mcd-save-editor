import {
  validateBySchema,
  validateItemType,
  validateEnchantmentChunks,
  validateNetheriteEnchant,
  validateArmorProperties,
} from './ValidationFunctions';
import ItemSchema from '../../../../static/json/schemas/item.schema.json';

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
      validateNetheriteEnchant.call(this, item);
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
