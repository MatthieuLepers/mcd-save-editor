/**
 * @author Matthieu LEPERS
 * @version 1.0.0
 */
class DragDropStore {
  /**
   * @constructor
   */
  constructor() {
    this.from = null;
    this.to = null;
  }

  /**
   * @param {any} target
   */
  setDragTo(target) {
    this.to = target;
  }

  /**
   * @param {any} from
   */
  setDragFrom(from) {
    this.from = from;
  }

  handleDropToEmpty() {
    if (this.to.slot) {
      this.from.hotbarSlot = this.to.slot;
    } else {
      this.from.gearType = this.to.type;
    }
    delete this.from.$data.inventoryIndex;
  }

  /**
   * @param {MCDCharacter} character
   */
  handleDrop(character) {
    const fromIndex = character.inventory.items.indexOf(this.from);
    const toIndex = character.inventory.items.indexOf(this.to);
    const fromIsEquipped = this.from.isEquipped();
    const toIsEquipped = this.to.isEquipped();
    const methodName = `drop${fromIsEquipped ? 'Equipped' : 'Inventory'}To${toIsEquipped ? 'Equipped' : 'Inventory'}`;

    // Swaping data
    this[methodName]();

    // Swaping items in inventory array
    character.inventory.items[toIndex] = this.from;
    character.$data.items[toIndex] = this.from.$data;
    character.inventory.items[fromIndex] = this.to;
    character.$data.items[fromIndex] = this.to.$data;
  }

  dropEquippedToInventory() {
    // 'from' takes inventory slot of 'to'
    this.from.$data.inventoryIndex = this.to.$data.inventoryIndex;
    delete this.to.$data.inventoryIndex;

    // 'to' takes equipped slot of 'from'
    this.to.$data.equipmentSlot = this.from.$data.equipmentSlot;
    delete this.from.$data.equipmentSlot;
  }

  dropInventoryToEquipped() {
    // 'to' takes inventory slot of 'from'
    this.to.$data.inventoryIndex = this.from.$data.inventoryIndex;
    delete this.from.$data.inventoryIndex;

    // 'from' takes equipped slot of 'to'
    this.from.$data.equipmentSlot = this.to.$data.equipmentSlot;
    delete this.to.$data.equipmentSlot;
  }

  dropInventoryToInventory() {
    // Swaping inventoryIndex
    const oldFromSlot = this.from.$data.inventoryIndex;
    this.from.$data.inventoryIndex = this.to.$data.inventoryIndex;
    this.to.$data.inventoryIndex = oldFromSlot;
  }

  dropEquippedToEquipped() {
    // Swaping equipmentSlot
    const oldFromSlot = this.from.$data.equipmentSlot;
    this.from.$data.equipmentSlot = this.to.$data.equipmentSlot;
    this.to.$data.equipmentSlot = oldFromSlot;
  }
}

export default new DragDropStore();
