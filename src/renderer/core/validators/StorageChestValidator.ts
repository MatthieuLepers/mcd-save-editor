import AbstractValidator from '@renderer/core/validators/AbstractValidator';
import type { ICharacter } from '@renderer/core/classes/Character';
import type { IGameItem } from '@renderer/core/entities/item/i';
import StoredItemSchema from '@renderer/public/json/schemas/storedItem.schema.json';

export default class StorageChestValidator extends AbstractValidator<ICharacter> {
  constructor(data: ICharacter) {
    super(data);

    this.data.storageChestItems.forEach((item) => {
      this.validateBySchema(StoredItemSchema, item);
      this.validateItemType(item);
      this.validateEnchantmentChunks(item);
      this.validateNetheriteEnchant(item);
      this.validateArmorProperties(item);
    });
  }

  get items(): Array<IGameItem> {
    return this.data.storageChestItems;
  }
}
