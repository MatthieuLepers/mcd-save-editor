import AbstractValidator from '@renderer/core/validators/AbstractValidator';
import type { ICharacter } from '@renderer/core/classes/Character';
import type { IItem } from '@renderer/core/classes/Item';
import ItemSchema from '@renderer/public/json/schemas/item.schema.json';

export default class InventoryValidator extends AbstractValidator<ICharacter> {
  constructor(data: ICharacter) {
    super(data);

    this.data.items.forEach((item) => {
      this.validateBySchema(ItemSchema, item);
      this.validateItemType(item);
      this.validateEnchantmentChunks(item);
      this.validateNetheriteEnchant(item);
      this.validateArmorProperties(item);
    });
  }

  get items(): Array<IItem> {
    return this.data.items;
  }
}
