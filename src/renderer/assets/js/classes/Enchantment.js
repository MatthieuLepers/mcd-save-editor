import i18n from '@/plugins/i18n';
import EnchantmentTierEnum from './enums/EnchantmentTierEnum';
import { Enchants } from '../data/Content';

/**
 * @author Matthieu LEPERS
 * @version 1.0.0
 */
export default class Enchantment {
  /**
   * @constructor
   * @param {Object} data
   * @param {Boolean} isGilded
   */
  constructor(data, isGilded = false) {
    this.$data = data;
    this.$netherite = false;
    this.isGilded = isGilded;

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
    if (!Enchants[this.id]) {
      return Enchants.Unknown;
    }
    return Enchants[this.id];
  }

  /**
   * @return {Number}
   */
  get enchantmentPointsInvested() {
    if (this.$netherite) return 0;
    const { tier } = this.enchantData;
    const offset = (tier === EnchantmentTierEnum.COMMON ? 0 : 1) + this.isGilded;

    return [...Array(this.level).keys()]
      .map((t) => t + 1 + offset)
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
    if (this.$netherite) return 0;
    const { tier } = this.enchantData;
    const offset = (tier === EnchantmentTierEnum.COMMON ? 0 : 1) + this.isGilded;

    return [...Array(3).keys()]
      .map((t) => t + 1 + offset)[level - 1]
    ;
  }

  /**
   * @param {Boolean} netherite
   */
  setNetherite(netherite) {
    this.$netherite = netherite;
  }

  /**
   * @return {String}
   */
  toString() {
    return i18n.t(`MCD.Game.Enchants.${this.enchantIdentifier}.name`);
  }
}