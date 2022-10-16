<template>
  <div class="MCDStorageChest" :key="globalKey">
    <div class="MCDStorageChestTitle">
      {{ $t('App.Navigation.storageChest') }}
    </div>
    <div
      :class="GenerateModifiers('MCDStorageChestItems', { Over: dragOver })"
      @dragover.stop="handleDragOver"
      @dragleave.stop="dragOver = false"
      @drop.stop="handleDrop"
    >
      <MCDItem
        v-for="(item, i) in storageChest"
        :key="i"
        :item="item"
        :disableEquipControl="true"
        :noDragOverEvent="true"
        :noDropEvent="true"
      />
      <MCDItemEmpty
        v-for="(slot, i) in emptySlots"
        :key="storageChest.length + i"
        :noDragEvent="true"
        :cross="true"
      />
    </div>
  </div>
</template>

<script>
import GlobalStore from '@/assets/js/stores/GlobalStore';
import DragDropStore from '@/assets/js/stores/DragDropStore';

import MCDItem from './Item';
import MCDItemEmpty from './ItemEmpty';

export default {
  name: 'MCDStorageChest',
  components: { MCDItem, MCDItemEmpty },
  data() {
    return {
      dragOver: false,
    };
  },
  computed: {
    globalKey() {
      return GlobalStore.key;
    },
    storageChest() {
      return GlobalStore.selectedCharacter.storageChest.items;
    },
    emptySlots() {
      if (this.storageChest.length < 12) {
        return [...Array(12 - this.storageChest.length).keys()];
      }

      const len = this.storageChest.length;
      return [...Array(Math.ceil(len / 3) * 3 - len).keys()];
    },
  },
  methods: {
    handleDragOver(e) {
      if (!DragDropStore.from.isStored()) {
        e.preventDefault();
        this.dragOver = true;
      }
    },
    handleDrop() {
      DragDropStore.dropToStorageChest(GlobalStore.selectedCharacter);
      this.dragOver = false;
    },
  },
};
</script>

<style lang="scss" src="./StorageChest.scss">
</style>
