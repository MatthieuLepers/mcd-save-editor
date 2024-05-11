<template>
  <div class="MCDStorageChest" :key="State.globalKey">
    <div class="MCDStorageChestTitle">
      {{ t('App.Navigation.storageChest') }}
    </div>
    <div
      :class="GenerateModifiers('MCDStorageChestItems', { Over: state.dragOver })"
      @dragover.stop="actions.handleDragOver"
      @dragleave.stop="state.dragOver = false"
      @drop.stop="actions.handleDrop"
    >
      <MCDItem
        v-for="(item, i) in State.storageChest"
        :key="i"
        :item="item"
        :disableEquipControl="true"
        :noDragOverEvent="true"
        :noDropEvent="true"
      />
      <MCDItemEmpty
        v-for="(slot, i) in State.emptySlots"
        :key="State.storageChest.length + i"
        :noDragEvent="true"
        :cross="true"
      />
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue';
import { useI18n } from 'vue-i18n';

import MCDItem from '@renderer/components/MCD/Item.vue';
import MCDItemEmpty from '@renderer/components/MCD/ItemEmpty.vue';

import { globalStore } from '@renderer/core/stores/GlobalStore';
import { dragDropStore } from '@renderer/core/stores/DragDropStore';

defineOptions({ name: 'MCDStorageChest' });

const { t } = useI18n();

const state = reactive({
  dragOver: false,
});

const State = computed(() => {
  const globalKey = globalStore.state.key;
  const storageChest = globalStore.state.selectedCharacter.storageChest.items;
  const len = storageChest.length;
  const emptySlots = storageChest.length < 12
    ? [...Array(12 - storageChest.length).keys()]
    : [...Array(Math.ceil(len / 3) * 3 - len).keys()]
  ;

  return {
    globalKey,
    storageChest,
    emptySlots,
  };
});

const actions = {
  handleDragOver(e) {
    if (!dragDropStore.state.from.isStored()) {
      e.preventDefault();
      state.dragOver = true;
    }
  },
  handleDrop() {
    dragDropStore.actions.dropToStorageChest(globalStore.state.selectedCharacter);
    state.dragOver = false;
  },
};
</script>

<style lang="scss" src="./StorageChest.scss">
</style>
