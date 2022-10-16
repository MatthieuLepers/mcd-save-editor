<template>
  <div
    :class="GenerateModifiers('MCDItem', { Empty: true, CrossIcon: cross })"
    @dragover.stop="handleDragOver"
    @drop.stop="handleDrop"
  >
    <div class="MCDItemLevel" v-if="itemType">
      <i :class="`icon-${itemType.toLowerCase()}`"></i>
    </div>
    <MCDItemTile />
  </div>
</template>

<script>
import GlobalStore from '@/assets/js/stores/GlobalStore';
import DragDropStore from '@/assets/js/stores/DragDropStore';

import MCDItemTile from './ItemTile';

export default {
  name: 'MCDItemEmpty',
  components: { MCDItemTile },
  props: {
    itemType: { type: String, default: null },
    hotbarSlot: { type: Number, default: null },
    noDragEvent: { type: Boolean, default: false },
    cross: { type: Boolean, default: false },
  },
  methods: {
    handleDragOver(e) {
      if (!this.noDragEvent) {
        DragDropStore.setDragTo({ type: this.itemType, slot: this.hotbarSlot });

        if (DragDropStore.from && DragDropStore.from.itemData.type === this.itemType) {
          e.preventDefault();
        }
      }
    },
    handleDrop() {
      if (!this.noDragEvent) {
        DragDropStore.handleDropToEmpty();

        GlobalStore.selectedItem = DragDropStore.from;
        GlobalStore.selectedCharacter.inventory.checkIntegrity();
        GlobalStore.key += 1;
      }
    },
  },
};
</script>

<style lang="scss" src="./Item.scss">
</style>
