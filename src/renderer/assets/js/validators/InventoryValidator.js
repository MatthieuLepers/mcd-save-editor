import {
  validateBySchema,
  validateItemType,
  validateEnchantmentChunks,
  validateNetheriteEnchant,
  validateArmorProperties,
} from './ValidationFunctions';
import AbstractValidator from './AbstractValidator';
import ItemSchema from '../../../../../static/json/schemas/item.schema.json';

export default class InventoryValidator extends AbstractValidator {
  /**
   * @constructor
   * @param {Object} data
   */
  constructor(data) {
    super(data);

    this.data.items.forEach((item) => {
      validateBySchema.call(this, ItemSchema, item);
      validateItemType.call(this, item);
      validateEnchantmentChunks.call(this, item);
      validateNetheriteEnchant.call(this, item);
      validateArmorProperties.call(this, item);
    });
  }
}
