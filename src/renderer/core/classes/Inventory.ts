import AbstractItemStorage from '@renderer/core/classes/AbstractItemStorage';
import { ItemTypeEnum } from '@renderer/core/classes/enums/ItemTypeEnum';
import { globalStore } from '@renderer/core/stores/GlobalStore';
import type Item from '@renderer/core/classes/Item';
import type { IItem } from '@renderer/core/classes/Item';

export default class Inventory extends AbstractItemStorage {
  constructor(data: Array<IItem>) {
    super(180, data);
  }

  get gears(): Array<Item> {
    const gears = this.items.filter((item) => item.isGear());
    if (gears.length < 3) {
      const [meleeGear] = gears.filter((item) => item.gearType === ItemTypeEnum.MELEE);
      const [armorGear] = gears.filter((item) => item.gearType === ItemTypeEnum.ARMOR);
      const [rangedGear] = gears.filter((item) => item.gearType === ItemTypeEnum.RANGED);

      return [meleeGear, armorGear, rangedGear];
    }

    return gears;
  }

  get hotbar(): Array<Item> {
    const hotbar = this.items.filter((item) => item.isHotbar());
    if (hotbar.length < 3) {
      const [fstSlot] = hotbar.filter((item) => item.hotbarSlot === 1);
      const [sndSlot] = hotbar.filter((item) => item.hotbarSlot === 2);
      const [thdSlot] = hotbar.filter((item) => item.hotbarSlot === 3);

      return [fstSlot, sndSlot, thdSlot];
    }

    return hotbar;
  }

  get inventory(): Array<Item> {
    return this.items.filter((item) => !item.isEquipped());
  }

  checkIntegrity() {
    const [meleeItem] = this.gears.filter((item) => item && item.gearType === ItemTypeEnum.MELEE);
    const [armorItem] = this.gears.filter((item) => item && item.gearType === ItemTypeEnum.ARMOR);
    const [rangedItem] = this.gears.filter((item) => item && item.gearType === ItemTypeEnum.RANGED);
    const [artifact1] = this.hotbar.filter((item) => item && item.hotbarSlot === 1);
    const [artifact2] = this.hotbar.filter((item) => item && item.hotbarSlot === 2);
    const [artifact3] = this.hotbar.filter((item) => item && item.hotbarSlot === 3);

    const inventoryItems = this.inventory;
    inventoryItems.forEach((item, index) => {
      item.data.inventoryIndex = index;
    });

    this.items = [
      meleeItem, armorItem, rangedItem,
      artifact1, artifact2, artifact3,
      ...inventoryItems,
    ].filter((item) => !!item);
    this.data = this.items.map(({ data }) => data);
    globalStore.state.selectedCharacter!.data.items = this.data;
  }
}
