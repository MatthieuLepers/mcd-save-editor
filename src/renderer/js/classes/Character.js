import Currencies from './Currencies';
import Inventory from './Inventory';

import GlobalStore from '../stores/GlobalStore';
import EncryptionService from '../services/EncryptionService';
import CharacterUtils from '../utils/CharacterUtils';

/**
 * @author Matthieu LEPERS
 * @version 1.0.0
 */
export default class Character {
  /**
   * @constructor
   * @param {Object} data
   * @param {String} filePath
   */
  constructor(data, filePath) {
    this.$data = data;
    this.$filePath = filePath;
    this.currencies = new Currencies(this.$data.currency);
    this.inventory = new Inventory(this.$data.items);
  }

  /**
   * @return {String}
   */
  get id() {
    return this.$data.playerId;
  }

  /**
   * @return {String}
   */
  get uuid() {
    return this.id.replace(/-/, '');
  }

  /**
   * @return {Number}
   */
  get level() {
    return CharacterUtils.xp2Level(this.$data.xp);
  }

  /**
   * @param {Number}
   */
  set level(level) {
    this.$data.xp = CharacterUtils.level2Xp(level);
  }

  /**
   * @return {Number}
   */
  get enchantmentPointsInvested() {
    return this.inventory.items.reduce((acc, item) => acc + item.enchantmentPointsInvested, 0);
  }

  /**
   * @return {Number}
   */
  get enchantmentPoints() {
    return this.level - this.enchantmentPointsInvested;
  }

  /**
   * @return {Promise<Boolean>}
   */
  save() {
    return EncryptionService.encrypt(this.$data, this.$filePath);
  }

  async reload() {
    this.$data = await EncryptionService.decrypt(this.$filePath, true);
    this.currencies = new Currencies(this.$data.currency);
    this.inventory = new Inventory(this.$data.items);
    GlobalStore.selectedCharacter = this;
  }

  /**
   * @param {String} filePath
   * @param {Boolean} force
   * @return {Character}
   */
  static async loadFromFile(filePath, force = false) {
    const data = await EncryptionService.decrypt(filePath, force);
    return new Character(data, filePath);
  }
}
