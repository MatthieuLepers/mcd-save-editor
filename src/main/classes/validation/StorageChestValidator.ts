import AbstractValidator from '@/main/classes/validation/AbstractValidator';
import StoredItemSchema from '@renderer/public/json/schemas/storedItem.schema.json';

export default class InventoryValidator extends AbstractValidator {
  public corrupted: boolean = false;

  constructor(public data: any) {
    super(data);

    this.data.storageChestItems.forEach((item) => {
      this.validateBySchema(StoredItemSchema, item);
      this.validateItemType(item);
      this.validateEnchantmentChunks(item);
      this.validateNetheriteEnchant(item);
      this.validateArmorProperties(item);
    });
  }
}
