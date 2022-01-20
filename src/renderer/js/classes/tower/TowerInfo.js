import Item from '../Item';
import TowerConfig from './TowerConfig';

/**
 * @author Matthieu LEPERS
 * @version 1.0.0
 */
export default class TowerInfo {
  /**
   * @constructor
   * @param {Object} data
   */
  constructor(data) {
    this.$data = data;
    this.config = new TowerConfig(this.$data.towerConfig, this.$data.towerInfo);
    this.items = this.$data.towerItems.map((itemData) => new Item(itemData, true));
  }

  /**
   * @return {Item[]}
   */
  get gears() {
    return this.items.slice(0, 3);
  }

  /**
   * @return {Item[]}
   */
  get hotbar() {
    return this.items.slice(3);
  }

  /**
   * @return {Number}
   */
  get enchantmentPoints() {
    return this.$data.towerEnchantmentPointsGranted - this.gears.reduce((acc, item) => acc + item.enchantmentPointsInvested, 0);
  }

  /**
   * @param {Number} amount
   */
  set enchantmentPoints(amount) {
    this.$data.towerEnchantmentPointsGranted = amount + this.gears.reduce((acc, item) => acc + item.enchantmentPointsInvested, 0);
  }
}
