import Item from './Item';
import GlobalStore from '../stores/GlobalStore';

/**
 * @author Matthieu LEPERS
 * @version 1.0.0
 */
export default class AbstractItemStorage {
  /**
   * @constructor
   * @param {Number} maxStorageSize
   * @param {Object[]} data
   */
  constructor(maxStorageSize, data) {
    if (this.constructor.name === 'AbstractItemStorage') {
      throw new Error('Cannot instanciate abstract class \'AbstractItemStorage\'');
    }

    this.$data = data;
    this.items = this.$data.map((itemData) => new Item(itemData));

    if (!this.constructor.MAX_STORAGE_SIZE) {
      Object.defineProperty(this.constructor, 'MAX_STORAGE_SIZE', {
        get: () => maxStorageSize,
      });
    }
  }

  /**
   * @return {Item[]}
   */
  get inventory() {
    return this.items;
  }

  /**
   * @return {Boolean}
   */
  isFull() {
    return this.inventory.length === this.constructor.MAX_STORAGE_SIZE;
  }

  /**
   * @return {Number}
   */
  getAvailableSlotCount() {
    return this.constructor.MAX_STORAGE_SIZE - this.inventory.length;
  }

  /**
   * @param {Item} item
   */
  addItem(item) {
    if (item.$data.equipmentSlot) {
      delete item.$data.equipmentSlot;
    }
    item.$data.inventoryIndex = 0;
    item.$data.markedNew = true;

    const indexOfFirstInventoryItem = this.items.findIndex((item) => item.$data.inventoryIndex === 0);
    this.$data.splice(indexOfFirstInventoryItem, 0, item.$data);
    this.items.splice(indexOfFirstInventoryItem, 0, item);

    this.checkIntegrity();
    [GlobalStore.selectedItem] = this.inventory;
  }

  /**
   * @param {Item} item
   */
  removeItem(item) {
    this.$data.splice(this.$data.indexOf(item.$data), 1);
    this.items.splice(this.items.indexOf(item), 1);

    this.checkIntegrity();
  }

  checkIntegrity() {
    throw new Error(`You must implement abstract method 'checkIntegrity' in class '${this.constructor.name}'`);
  }
}
