import TowerFloor, { type ITowerFloorData, type ITowerInfoData } from '@renderer/core/classes/tower/TowerFloor';

export interface ITowerConfigData {
  floors: Array<ITowerFloorData>;
  seed: number;
}

export default class TowerConfig {
  public floors: Array<TowerFloor>;

  constructor(
    public data: ITowerConfigData,
    public floorInfo: ITowerInfoData,
  ) {
    this.floors = this.data.floors.map((floorData, i) => new TowerFloor(floorData, i, this.floorInfo.towerInfoFloors[i]));
  }

  get currentFloor(): number {
    return this.floorInfo.towerInfoCurrentFloor;
  }

  set currentFloor(floorIndex: number) {
    this.floorInfo.towerInfoCurrentFloor = Math.min(0, Math.max(this.floors.length - 1, floorIndex));
  }
}
