import AbstractValidator from '@renderer/core/validators/AbstractValidator';
import type { IItem } from '@renderer/core/classes/Item';
import ItemSchema from '@renderer/public/json/schemas/item.schema.json';

export default class ItemValidator extends AbstractValidator<IItem> {
  constructor(data: IItem) {
    super(data);

    this.validateBySchema(ItemSchema, this.data);
    this.validateItemType(this.data);
    this.validateEnchantmentChunks(this.data);
    this.validateArmorProperties(this.data);
  }

  get items(): Array<IItem> {
    return [this.data];
  }
}
