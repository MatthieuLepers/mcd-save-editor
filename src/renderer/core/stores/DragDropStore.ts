import { reactive } from 'vue';

import type GameItem from '@renderer/core/entities/item/game';
import Character from '@renderer/core/classes/Character';

interface StoreData {
  to: GameItem | null;
  from: GameItem | null;
}

const useDragDropStore = () => {
  const state = reactive<StoreData>({
    to: null,
    from: null,
  });

  const actions = {
    setDragTo(target: GameItem) {
      state.to = target;
    },
    setDragFrom(target: GameItem) {
      state.from = target;
    },
    handleDropToEmpty() {
      if (state.to!.hotbarSlot) {
        state.from!.hotbarSlot = state.to!.hotbarSlot;
      } else {
        state.from!.gearType = state.to!.gearType;
      }
      delete state.from!.data.inventoryIndex;
    },
    handleDrop(character: Character) {
      const fromIsEquipped = state.from!.isEquipped();
      const toIsEquipped = state.to!.isEquipped();
      const methodName = `drop${fromIsEquipped ? 'Equipped' : 'Inventory'}To${toIsEquipped ? 'Equipped' : 'Inventory'}`;

      // Swaping data
      actions[methodName]();

      const storageType = state.from!.isStored() && state.to!.isStored() ? 'storageChest' : 'inventory';
      const fromIndex = character[storageType].items.indexOf(state.from!);
      const toIndex = character[storageType].items.indexOf(state.to!);

      // Swaping items in inventory array
      character[storageType].items[toIndex] = state.from!;
      character.data.items[toIndex] = state.from!.data;
      character[storageType].items[fromIndex] = state.to!;
      character.data.items[fromIndex] = state.to!.data;
    },
    dropEquippedToInventory() {
      // 'from' takes inventory slot of 'to'
      state.from!.data.inventoryIndex = state.to!.data.inventoryIndex;
      delete state.to!.data.inventoryIndex;

      // 'to' takes equipped slot of 'from'
      state.to!.data.equipmentSlot = state.from!.data.equipmentSlot;
      delete state.from!.data.equipmentSlot;
    },
    dropInventoryToEquipped() {
      // 'to' takes inventory slot of 'from'
      state.to!.data.inventoryIndex = state.from!.data.inventoryIndex;
      delete state.from!.data.inventoryIndex;

      // 'from' takes equipped slot of 'to'
      state.from!.data.equipmentSlot = state.to!.data.equipmentSlot;
      delete state.to!.data.equipmentSlot;
    },
    dropInventoryToInventory() {
      // Swaping inventoryIndex
      const oldFromSlot = state.from!.data.inventoryIndex;
      state.from!.data.inventoryIndex = state.to!.data.inventoryIndex;
      state.to!.data.inventoryIndex = oldFromSlot;
    },
    dropEquippedToEquipped() {
      // Swaping equipmentSlot
      const oldFromSlot = state.from!.data.equipmentSlot;
      state.from!.data.equipmentSlot = state.to!.data.equipmentSlot;
      state.to!.data.equipmentSlot = oldFromSlot;
    },
    dropToInventory(character: Character) {
      // 'from' is from storage chest
      character.inventory.addItem(state.from!);
      character.storageChest.removeItem(state.from!);
    },
    dropToStorageChest(character: Character) {
      // 'from' is from inventory
      character.storageChest.addItem(state.from!);
      character.inventory.removeItem(state.from!);
    },
  };

  return {
    state,
    actions,
  };
};

export const dragDropStore = useDragDropStore();
