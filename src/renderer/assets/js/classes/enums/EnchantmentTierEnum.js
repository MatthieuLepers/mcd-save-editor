import Enum from './Enum';

/**
 * @author Matthieu LEPERS
 * @version 1.0.0
 */
export default class EnchantmentTierEnum extends Enum {
  /**
   * @return {String}
   */
  static get COMMON() {
    return 'Common';
  }

  /**
   * @return {String}
   */
  static get POWERFUL() {
    return 'Powerful';
  }
}
