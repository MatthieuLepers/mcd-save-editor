import Item from '@renderer/core/classes/Item';
import type { IItem } from '@renderer/core/classes/Item';
import { globalStore } from '@renderer/core/stores/GlobalStore';

export default abstract class AbstractItemStorage {
  public items: Array<Item> = [];

  constructor(maxStorageSize: number, public data: Array<IItem>) {
    this.items = this.data.map((itemData) => new Item(itemData));

    // @ts-ignore
    if (!this.constructor.MAX_STORAGE_SIZE) {
      Object.defineProperty(this.constructor, 'MAX_STORAGE_SIZE', {
        get: () => maxStorageSize,
      });
    }
  }

  get inventory(): Array<Item> {
    return this.items;
  }

  isFull(): boolean {
    // @ts-ignore
    return this.inventory.length === this.constructor.MAX_STORAGE_SIZE;
  }

  getAvailableSlotCount(): number {
    // @ts-ignore
    return this.constructor.MAX_STORAGE_SIZE - this.inventory.length;
  }

  addItem(item: Item) {
    if (item.data.equipmentSlot) {
      delete item.data.equipmentSlot;
    }
    item.data.inventoryIndex = 0;
    item.data.markedNew = true;

    const indexOfFirstInventoryItem = this.items.findIndex((itm) => itm.data.inventoryIndex === 0);
    this.data.splice(indexOfFirstInventoryItem, 0, item.data);
    this.items.splice(indexOfFirstInventoryItem, 0, item);

    this.checkIntegrity();
    globalStore.setters.setItem(this.inventory[0]);
  }

  removeItem(item: Item) {
    this.data.splice(this.data.indexOf(item.data), 1);
    this.items.splice(this.items.indexOf(item), 1);

    this.checkIntegrity();
  }

  contains(item: Item) {
    return this.items.includes(item);
  }

  abstract checkIntegrity(): void;
}
