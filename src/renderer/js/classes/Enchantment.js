import EnchantmentTierEnum from './enums/EnchantmentTierEnum';

import EnchantsData from '../data/Enchants';

/**
 * @author Matthieu LEPERS
 * @version 1.0.0
 */
export default class Enchantment {
  /**
   * @constructor
   * @param {Object} data
   */
  constructor(data) {
    this.$data = data;

    Object.keys(this.$data).forEach((key) => {
      Object.defineProperty(this, key, {
        get: () => this.$data[key],
        set: (value) => { this.$data[key] = value; },
      });
    });
  }

  /**
   * @return {Enchantment}
   */
  static get UNSET() {
    return new Enchantment({ id: 'Unset', level: 0 });
  }

  /**
   * @return {Object}
   */
  get enchantData() {
    if (!EnchantsData[this.id]) {
      return EnchantsData.Unknown;
    }
    return EnchantsData[this.id];
  }

  /**
   * @return {Number}
   */
  get enchantmentPointsInvested() {
    const { tier } = this.enchantData;
    const offset = (tier === EnchantmentTierEnum.COMMON ? 0 : 1);

    return [...Array(this.level).keys()]
      .map(t => t + 1 + offset)
      .reduce((acc, val) => acc + val, 0)
    ;
  }

  /**
   * @return {String}
   */
  get enchantIdentifier() {
    if (this.enchantData.type) {
      return this.id;
    }
    return 'Unknown';
  }

  /**
   * @return {Number}
   */
  getInvestmentCostForLevel(level) {
    const { tier } = this.enchantData;
    const offset = (tier === EnchantmentTierEnum.COMMON ? 0 : 1);

    return [...Array(3).keys()]
      .map(t => t + 1 + offset)[level - 1]
    ;
  }
}
