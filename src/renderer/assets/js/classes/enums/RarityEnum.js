import Enum from './Enum';

/**
 * @author Matthieu LEPERS
 * @version 1.0.0
 */
export default class RarityEnum extends Enum {
  /**
   * @return {String}
   */
  static get COMMON() {
    return 'Common';
  }

  /**
   * @return {String}
   */
  static get RARE() {
    return 'Rare';
  }

  /**
   * @return {String}
   */
  static get UNIQUE() {
    return 'Unique';
  }
}
