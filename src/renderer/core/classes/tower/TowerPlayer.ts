import GameItem from '@renderer/core/entities/item/game';
import type { IGameItem } from '@renderer/core/entities/item/i';

export interface ITowerPlayerData {
  playerArrowsAmmount: number;
  playerEnchantmentPointsGranted: number;
  playerItems: Array<IGameItem>;
  playerLastFloorIndex: number;
}

export default class TowerPlayer {
  public items: Array<GameItem> = [];

  constructor(public data: ITowerPlayerData) {
    this.items = this.data.playerItems.map((itemData) => new GameItem(itemData));
  }

  get gears(): Array<GameItem> {
    return this.items.slice(0, 3);
  }

  get hotbar(): Array<GameItem | undefined> {
    const hb = this.items.slice(3);
    return [...Array(3 - hb.length).keys()].map(() => undefined);
  }
}
