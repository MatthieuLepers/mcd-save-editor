import AbstractItemStorage from '@renderer/core/classes/AbstractItemStorage';
import { globalStore } from '@renderer/core/stores/GlobalStore';
import { Type } from '@renderer/core/entities/item/enums';
import type GameItem from '@renderer/core/entities/item/game';
import type { IGameItem } from '@renderer/core/entities/item/i';

type TPositionAttribute = { gearType: `${Type}` } | { hotbarSlot: number } | { inventoryIndex: number };

export default class Inventory extends AbstractItemStorage {
  constructor(data: Array<IGameItem>) {
    super(180, data);
  }

  get gears(): Array<GameItem> {
    const gears = this.items.filter((item) => item.isGear());
    if (gears.length < 3) {
      const [meleeGear] = gears.filter((item) => item.gearType === Type.MELEE);
      const [armorGear] = gears.filter((item) => item.gearType === Type.ARMOR);
      const [rangedGear] = gears.filter((item) => item.gearType === Type.RANGED);

      return [meleeGear, armorGear, rangedGear];
    }

    return gears;
  }

  get hotbar(): Array<GameItem> {
    const hotbar = this.items.filter((item) => item.isHotbar());
    if (hotbar.length < 3) {
      const [fstSlot] = hotbar.filter((item) => item.hotbarSlot === 1);
      const [sndSlot] = hotbar.filter((item) => item.hotbarSlot === 2);
      const [thdSlot] = hotbar.filter((item) => item.hotbarSlot === 3);

      return [fstSlot, sndSlot, thdSlot];
    }

    return hotbar;
  }

  get inventory(): Array<GameItem> {
    return this.items.filter((item) => !item.isEquipped());
  }

  insertAt(item: GameItem, position: TPositionAttribute) {
    Object.keys(position).forEach((key) => {
      item[key] = position[key];
    });
    this.items.push(item);
    this.checkIntegrity();
  }

  checkIntegrity() {
    const [meleeItem] = this.gears.filter((item) => item && item.gearType === Type.MELEE);
    const [armorItem] = this.gears.filter((item) => item && item.gearType === Type.ARMOR);
    const [rangedItem] = this.gears.filter((item) => item && item.gearType === Type.RANGED);
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
