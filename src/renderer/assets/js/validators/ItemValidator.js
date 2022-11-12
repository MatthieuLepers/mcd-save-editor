import {
  validateBySchema,
  validateItemType,
  validateEnchantmentChunks,
  validateArmorProperties,
} from './ValidationFunctions';
import AbstractValidator from './AbstractValidator';
import ItemSchema from '../../../../../static/json/schemas/item.schema.json';

export default class ItemValidator extends AbstractValidator {
  /**
   * @constructor
   * @param {Object} data
   */
  constructor(data) {
    super(data);

    validateBySchema.call(this, ItemSchema, this.data);
    validateItemType.call(this, this.data);
    validateEnchantmentChunks.call(this, this.data);
    validateArmorProperties.call(this, this.data);
  }
}
