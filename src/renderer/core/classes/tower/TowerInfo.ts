import type { IItem } from '@renderer/core/classes/Item';
import TowerConfig, { type ITowerConfigData } from '@renderer/core/classes/tower/TowerConfig';
import TowerPlayer, { type ITowerPlayerData } from '@renderer/core/classes/tower/TowerPlayer';
import type { ITowerInnerInfoData } from '@renderer/core/classes/tower/TowerFloor';

export interface ITowerInfoData {
  towerConfig: ITowerConfigData;
  towerCurrentFloorWasCompleted: boolean;
  towerFinalRewards: Array<IItem>;
  towerFinished: boolean;
  towerId: string;
  towerInfo: ITowerInnerInfoData;
  towerPlayersData: Array<ITowerPlayerData>;
}

export default class TowerInfo {
  public config: TowerConfig;

  public players: Array<TowerPlayer>;

  constructor(public data: ITowerInfoData) {
    this.data = data;
    this.config = new TowerConfig(this.data.towerConfig, this.data.towerInfo);
    this.players = this.data.towerPlayersData.map((playerData) => new TowerPlayer(playerData));
  }
}
