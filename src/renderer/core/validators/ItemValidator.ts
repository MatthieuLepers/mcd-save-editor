import AbstractValidator from '@renderer/core/validators/AbstractValidator';
import type { IGameItem } from '@renderer/core/entities/item/i';
import ItemSchema from '@renderer/public/json/schemas/item.schema.json';

export default class ItemValidator extends AbstractValidator<IGameItem> {
  constructor(data: IGameItem) {
    super(data);

    this.validateBySchema(ItemSchema, this.data);
    this.validateItemType(this.data);
    this.validateEnchantmentChunks(this.data);
    this.validateArmorProperties(this.data);
  }

  get items(): Array<IGameItem> {
    return [this.data];
  }
}
