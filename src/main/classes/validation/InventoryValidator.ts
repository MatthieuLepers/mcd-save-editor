import AbstractValidator from '@/main/classes/validation/AbstractValidator';
import ItemSchema from '@renderer/public/json/schemas/item.schema.json';

export default class InventoryValidator extends AbstractValidator {
  public corrupted: boolean = false;

  constructor(public data: any) {
    super(data);

    this.data.items.forEach((item) => {
      this.validateBySchema(ItemSchema, item);
      this.validateItemType(item);
      this.validateEnchantmentChunks(item);
      this.validateNetheriteEnchant(item);
      this.validateArmorProperties(item);
    });
  }
}
