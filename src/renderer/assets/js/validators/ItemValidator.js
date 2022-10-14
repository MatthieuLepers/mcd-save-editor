import {
  validateBySchema,
  validateItemType,
  validateEnchantmentChunks,
  validateArmorProperties,
} from './ValidationFunctions';
import ItemSchema from '../../../../../static/json/schemas/item.schema.json';

export default class ItemValidator {
  /**
   * @constructor
   * @param {Object} data
   */
  constructor(data) {
    this.data = data;
    this.errors = [];

    validateBySchema.call(this, ItemSchema, this.data);
    validateItemType.call(this, this.data);
    validateEnchantmentChunks.call(this, this.data);
    validateArmorProperties.call(this, this.data);
  }

  /**
   * @return {Boolean}
   */
  isValid() {
    return !this.errors.length;
  }
}
