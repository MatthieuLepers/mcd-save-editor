import AbstractItemStorage from '@renderer/core/classes/AbstractItemStorage';
import { globalStore } from '@renderer/core/stores/GlobalStore';
import type Item from '@renderer/core/classes/Item';
import type { IItem } from '@renderer/core/classes/Item';

export default class StorageChest extends AbstractItemStorage {
  constructor(data: Array<IItem>) {
    super(300, data);
  }

  addItem(item: Item) {
    item.data.markedNew = true;

    this.data.splice(0, 0, item.data);
    this.items.splice(0, 0, item);

    this.checkIntegrity();
    [globalStore.state.selectedItem] = this.inventory;
  }

  checkIntegrity() {
    this.items = this.items.filter((item) => !!item);
    this.data = this.items.map(({ data }) => data);
    globalStore.state.selectedCharacter!.data.storageChestItems = this.data;
  }
}
