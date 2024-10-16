import AbstractItemStorage from '@renderer/core/classes/AbstractItemStorage';
import { globalStore } from '@renderer/core/stores/GlobalStore';
import type GameItem from '@renderer/core/entities/item/game';
import type { IGameItem } from '@renderer/core/entities/item/i';

export default class StorageChest extends AbstractItemStorage {
  constructor(data: Array<IGameItem>) {
    super(300, data);
  }

  addItem(item: GameItem) {
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
