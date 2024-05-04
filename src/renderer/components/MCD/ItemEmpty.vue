<template>
  <div
    :class="GenerateModifiers('MCDItem', { Empty: true, CrossIcon: props.cross })"
    @dragover.stop="actions.handleDragOver"
    @drop.stop="actions.handleDrop"
  >
    <div class="MCDItemLevel" v-if="props.itemType">
      <i :class="`icon-${props.itemType.toLowerCase()}`"></i>
    </div>
    <MCDItemTile />
  </div>
</template>

<script setup>
import MCDItemTile from '@renderer/components/MCD/ItemTile.vue';

import { globalStore } from '@renderer/core/stores/GlobalStore';
import { dragDropStore } from '@renderer/core/stores/DragDropStore';

defineOptions({ name: 'MCDItemEmpty' });

const props = defineProps({
  itemType: { type: String, default: null },
  hotbarSlot: { type: Number, default: null },
  noDragEvent: { type: Boolean, default: false },
  cross: { type: Boolean, default: false },
});

const actions = {
  handleDragOver(e) {
    if (!props.noDragEvent) {
      dragDropStore.actions.setDragTo({ type: props.itemType, slot: props.hotbarSlot });

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
};
</script>

<style lang="scss" src="./Item.scss">
</style>
