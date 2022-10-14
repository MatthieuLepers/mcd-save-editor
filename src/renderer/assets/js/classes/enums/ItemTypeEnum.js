import Enum from './Enum';

/**
 * @author Matthieu LEPERS
 * @version 1.0.0
 */
export default class ItemTypeEnum extends Enum {
  /**
   * @return {String}
   */
  static get MELEE() {
    return 'Melee';
  }

  /**
   * @return {String}
   */
  static get ARMOR() {
    return 'Armor';
  }

  /**
   * @return {String}
   */
  static get RANGED() {
    return 'Ranged';
  }

  /**
   * @return {String}
   */
  static get ARTEFACT() {
    return 'Artefact';
  }
}
