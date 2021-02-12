import Item from './Item';

import ItemTypeEnum from './enums/ItemTypeEnum';

import GlobalStore from '../stores/GlobalStore';

/**
 * @author Matthieu LEPERS
 * @version 1.0.0
 */
export default class Inventory {
  /**
   * @constructor
   * @param {Object[]} data
   */
  constructor(data) {
    this.$data = data;
    this.items = this.$data.map(itemData => new Item(itemData));
  }

  /**
   * @return {Item[]}
   */
  get gears() {
    const gears = this.items.filter(item => item.isGear());
    if (gears.length < 3) {
      const [meleeGear] = gears.filter(item => item.gearType === ItemTypeEnum.MELEE);
      const [armorGear] = gears.filter(item => item.gearType === ItemTypeEnum.ARMOR);
      const [rangedGear] = gears.filter(item => item.gearType === ItemTypeEnum.RANGED);

      return [meleeGear, armorGear, rangedGear];
    }

    return gears;
  }

  /**
   * @return {Item[]}
   */
  get hotbar() {
    const hotbar = this.items.filter(item => item.isHotbar());
    if (hotbar.length < 3) {
      const [fstSlot] = hotbar.filter(item => item.hotbarSlot === 1);
      const [sndSlot] = hotbar.filter(item => item.hotbarSlot === 2);
      const [thdSlot] = hotbar.filter(item => item.hotbarSlot === 3);

      return [fstSlot, sndSlot, thdSlot];
    }

    return hotbar;
  }

  /**
   * @return {Item[]}
   */
  get inventory() {
    return this.items.filter(item => !item.isEquipped());
  }

  /**
   * @return {Boolean}
   */
  isFull() {
    return this.inventory.length === 180;
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

    const indexOfFirstInventoryItem = this.items.findIndex(item => item.$data.inventoryIndex === 0);
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
    const [meleeItem] = this.gears.filter(item => item && item.gearType === ItemTypeEnum.MELEE);
    const [armorItem] = this.gears.filter(item => item && item.gearType === ItemTypeEnum.ARMOR);
    const [rangedItem] = this.gears.filter(item => item && item.gearType === ItemTypeEnum.RANGED);
    const [artifact1] = this.hotbar.filter(item => item && item.hotbarSlot === 1);
    const [artifact2] = this.hotbar.filter(item => item && item.hotbarSlot === 2);
    const [artifact3] = this.hotbar.filter(item => item && item.hotbarSlot === 3);

    const inventoryItems = this.inventory;
    inventoryItems.forEach((item, index) => {
      item.$data.inventoryIndex = index;
    });

    this.items = [
      meleeItem, armorItem, rangedItem,
      artifact1, artifact2, artifact3,
      ...inventoryItems,
    ].filter(item => !!item);
    this.$data = this.items.map(({ $data }) => $data);
    GlobalStore.selectedCharacter.$data.items = this.$data;
  }
}
