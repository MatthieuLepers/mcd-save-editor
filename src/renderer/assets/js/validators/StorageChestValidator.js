import {
  validateBySchema,
  validateItemType,
  validateEnchantmentChunks,
  validateNetheriteEnchant,
  validateArmorProperties,
} from './ValidationFunctions';
import AbstractValidator from './AbstractValidator';
import StoredItemSchema from '../../../../../static/json/schemas/storedItem.schema.json';

export default class StorageChestValidator extends AbstractValidator {
  /**
   * @constructor
   * @param {Object} data
   */
  constructor(data) {
    super(data);

    this.data.storageChestItems.forEach((item) => {
      validateBySchema.call(this, StoredItemSchema, item);
      validateItemType.call(this, item);
      validateEnchantmentChunks.call(this, item);
      validateNetheriteEnchant.call(this, item);
      validateArmorProperties.call(this, item);
    });
  }
}
