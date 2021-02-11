import Enum from './Enum';

/**
 * @author Matthieu LEPERS
 * @version 1.0.0
 */
export default class EquipmentSlotEnum extends Enum {
  /**
   * @return {String}
   */
  static get MELEEGEAR() {
    return 'MeleeGear';
  }

  /**
   * @return {String}
   */
  static get ARMORGEAR() {
    return 'ArmorGear';
  }

  /**
   * @return {String}
   */
  static get RANGEDGEAR() {
    return 'RangedGear';
  }

  /**
   * @return {String}
   */
  static get HOTBARSLOT1() {
    return 'HotbarSlot1';
  }

  /**
   * @return {String}
   */
  static get HOTBARSLOT2() {
    return 'HotbarSlot2';
  }

  /**
   * @return {String}
   */
  static get HOTBARSLOT3() {
    return 'HotbarSlot3';
  }
}
