import Item, { type IItem } from '@renderer/core/classes/Item';

export interface ITowerPlayerData {
  playerArrowsAmmount: number;
  playerEnchantmentPointsGranted: number;
  playerItems: Array<IItem>;
  playerLastFloorIndex: number;
}

export default class TowerPlayer {
  public items: Array<Item> = [];

  constructor(public data: ITowerPlayerData) {
    this.items = this.data.playerItems.map((itemData) => new Item(itemData));
  }

  get gears(): Array<Item> {
    return this.items.slice(0, 3);
  }

  get hotbar(): Array<Item | undefined> {
    const hb = this.items.slice(3);
    return [...Array(3 - hb.length).keys()].map(() => undefined);
  }
}
