import TowerInfo, { type ITowerInfoData } from '@renderer/core/classes/tower/TowerInfo';

export interface ITowerData {
  completedOnce: boolean;
  guid: string;
  livesLost: number;
  seed: number;
  towerInfo: ITowerInfoData;
}

export default class TowerData {
  public towerInfo: TowerInfo;

  constructor(public data: ITowerData) {
    this.towerInfo = new TowerInfo(this.data.towerInfo);
  }
}
