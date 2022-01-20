import TowerFloorTypeEnum from '../enums/TowerFloorTypeEnum';
import TowerFloorChallenge from './TowerFloorChallenge';

/**
 * @author Matthieu LEPERS
 * @version 1.0.0
 */
export default class TowerFloor {
  /**
   * @constructor
   * @param {Object} data
   * @param {Object} floorInfo
   */
  constructor(data, index, floorInfo) {
    this.$index = index;
    this.$data = data;
    this.infos = floorInfo;
    this.challenges = (this.$data.challenges || []).map((challengeData) => new TowerFloorChallenge(challengeData));
  }

  /**
   * @return {String}
   */
  get type() {
    return this.infos.towerFloorType;
  }

  /**
   * @return {TowerFloorChallenge|null}
   */
  get challenge() {
    return this.challenges[0] || null;
  }

  /**
   * @return {Boolean}
   */
  isEmpty() {
    return this.infos.towerFloorType === TowerFloorTypeEnum.EMPTY;
  }

  /**
   * @return {Boolean}
   */
  isCombat() {
    return this.infos.towerFloorType === TowerFloorTypeEnum.COMBAT;
  }

  /**
   * @return {Boolean}
   */
  isMerchant() {
    return this.infos.towerFloorType === TowerFloorTypeEnum.MERCHANT;
  }

  /**
   * @return {Boolean}
   */
  isBoss() {
    return this.infos.towerFloorType === TowerFloorTypeEnum.BOSS;
  }
}
