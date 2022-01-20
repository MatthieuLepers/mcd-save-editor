import TowerFloor from './TowerFloor';

/**
 * @author Matthieu LEPERS
 * @version 1.0.0
 */
export default class TowerConfig {
  /**
   * @constructor
   * @param {Object} data
   * @param {Object} floorInfo
   */
  constructor(data, floorInfo) {
    this.$data = data;
    this.floorInfo = floorInfo;
    this.floors = this.$data.floors.map((floorData, i) => new TowerFloor(floorData, i, this.floorInfo.towerInfoFloors[i]));
  }

  /**
   * @return {Number}
   */
  get currentFloor() {
    return this.floorInfo.towerInfoCurrentFloor;
  }
}
