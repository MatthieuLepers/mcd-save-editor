<template>
  <div
    :class="GenerateModifiers('MCDItem', {
      Empty: true,
      CrossIcon: props.cross,
      Clickable: props.clickable,
    })"
    @dragover.stop="actions.handleDragOver"
    @drop.stop="actions.handleDrop"
    @click="actions.handleCreateItem"
  >
    <div class="MCDItemLevel" v-if="props.itemType">
      <i :class="`icon-${props.itemType.toLowerCase()}`"></i>
    </div>
    <MCDItemTile />
  </div>
</template>

<script setup>
import MCDItemTile from '@renderer/components/MCD/ItemTile.vue';

import GameItem from '@renderer/core/entities/item/game';
import { Type } from '@renderer/core/entities/item/enums';
import { globalStore } from '@renderer/core/stores/GlobalStore';
import { dragDropStore } from '@renderer/core/stores/DragDropStore';

defineOptions({ name: 'MCDItemEmpty' });

const props = defineProps({
  itemType: { type: String, default: null },
  hotbarSlot: { type: Number, default: null },
  index: { type: Number, default: 0 },
  noDragEvent: { type: Boolean, default: false },
  cross: { type: Boolean, default: false },
  clickable: { type: Boolean, default: false },
});

const actions = {
  handleDragOver(e) {
    if (!props.noDragEvent) {
      dragDropStore.actions.setDragTo({ type: props.itemType, hotbarSlot: props.hotbarSlot });

      if (dragDropStore.state.from && dragDropStore.state.from.itemData.type === props.itemType) {
        e.preventDefault();
      }
    }
  },
  handleDrop() {
    if (!props.noDragEvent) {
      dragDropStore.actions.handleDropToEmpty();

      globalStore.setters.setItem(dragDropStore.state.from);
      globalStore.state.selectedCharacter.inventory.checkIntegrity();
      globalStore.state.key += 1;
    }
  },
  handleCreateItem() {
    if (props.clickable) {
      let newItem = GameItem.SWORD;
      if (props.itemType) {
        const mapping = {
          [Type.MELEE]: GameItem.SWORD,
          [Type.ARMOR]: GameItem.ARMOR,
          [Type.RANGED]: GameItem.BOW,
          [Type.ARTEFACT]: GameItem.ARTEFACT,
        };

        newItem = mapping[props.itemType];

        const positionAttribute = props.hotbarSlot
          ? { hotbarSlot: props.hotbarSlot }
          : { gearType: props.itemType }
        ;
        globalStore.state.selectedCharacter.inventory.insertAt(newItem, positionAttribute);
      } else {
        globalStore.state.selectedCharacter.inventory.insertAt(newItem, { inventoryIndex: props.index });
      }
    }
  },
};
</script>

<style lang="scss" src="./Item.scss">
</style>
