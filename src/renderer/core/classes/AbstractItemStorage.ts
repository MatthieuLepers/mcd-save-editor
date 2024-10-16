import GameItem from '@renderer/core/entities/item/game';
import type { IGameItem } from '@renderer/core/entities/item/i';
import { globalStore } from '@renderer/core/stores/GlobalStore';

export default abstract class AbstractItemStorage {
  public items: Array<GameItem> = [];

  constructor(
    maxStorageSize: number,
    public data: Array<IGameItem>,
  ) {
    this.items = this.data.map((itemData) => new GameItem(itemData));

    // @ts-ignore
    if (!this.constructor.MAX_STORAGE_SIZE) {
      Object.defineProperty(this.constructor, 'MAX_STORAGE_SIZE', {
        get: () => maxStorageSize,
      });
    }
  }

  get inventory(): Array<GameItem> {
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

  addItem(item: GameItem) {
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

  removeItem(item: GameItem) {
    this.data.splice(this.data.indexOf(item.data), 1);
    this.items.splice(this.items.indexOf(item), 1);

    this.checkIntegrity();
  }

  contains(item: GameItem) {
    return this.items.includes(item);
  }

  abstract checkIntegrity(): void;
}
