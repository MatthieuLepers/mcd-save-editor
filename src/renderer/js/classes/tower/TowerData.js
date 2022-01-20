import TowerInfo from './TowerInfo';

/**
 * @author Matthieu LEPERS
 * @version 1.0.0
 */
export default class TowerData {
  /**
   * @constructor
   * @param {Object} data
   */
  constructor(data) {
    this.$data = data;
    this.towerInfo = new TowerInfo(this.$data.towerInfo);
  }
}
