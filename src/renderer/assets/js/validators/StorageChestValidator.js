import {
  validateBySchema,
  validateItemType,
  validateEnchantmentChunks,
  validateNetheriteEnchant,
  validateArmorProperties,
} from './ValidationFunctions';
import StoredItemSchema from '../../../../../static/json/schemas/storedItem.schema.json';

export default class StorageChestValidator {
  /**
   * @constructor
   * @param {Object} data
   */
  constructor(data) {
    this.data = data;
    this.errors = [];

    this.data.storageChestItems.forEach((item) => {
      validateBySchema.call(this, StoredItemSchema, item);
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
    return !this.errors.length;
  }
}
