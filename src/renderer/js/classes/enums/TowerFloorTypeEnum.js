import Enum from './Enum';

/**
 * @author Matthieu LEPERS
 * @version 1.0.0
 */
export default class TowerFloorTypeEnum extends Enum {
  /**
   * @return {String}
   */
  static get EMPTY() {
    return 'Emtpy';
  }

  /**
   * @return {String}
   */
  static get COMBAT() {
    return 'Combat';
  }

  /**
   * @return {String}
   */
  static get MERCHANT() {
    return 'Merchant';
  }

  /**
   * @return {String}
   */
  static get BOSS() {
    return 'Boss';
  }
}
