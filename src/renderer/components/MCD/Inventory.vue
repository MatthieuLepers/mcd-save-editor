<template>
  <div class="MCDInventory" :key="State.globalKey">
    <div class="MCDInventoryFilters">
      <button
        v-for="(filter, i) in Object.values(Filters)"
        :key="i"
        :class="GenerateModifiers('MCDInventoryFilter', { Selected: filteredInventoryStore.state.filter.name === filter.name })"
        @click="actions.setFilter(filter)"
      >
        <span>{{ t(`MCD.Inventory.filters.${filter.name}`) }}</span>
        <i :class="`icon-${filter.icon}`"></i>
      </button>
    </div>
    <div
      :class="GenerateModifiers('MCDInventoryItems', { Over: state.dragOver })"
      @dragover.stop="actions.handleDragOver"
      @dragleave.stop="state.dragOver = false"
      @drop.stop="actions.handleDrop"
    >
      <MCDItem
        v-for="(item, i) in filteredInventoryStore.inventory.value"
        :key="i"
        :item="item"
        :disableEquipControl="props.disableEquipControl"
        :noDragOverEvent="!props.noDragEvent"
        :noDropEvent="!props.noDragEvent"
      />
      <MCDItemEmpty
        v-for="(slot, i) in State.emptySlots"
        :key="filteredInventoryStore.inventory.value.length + i"
        :index="filteredInventoryStore.inventory.value.length + i"
        :noDragEvent="true"
        :cross="true"
        :clickable="true"
      />
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue';
import { useI18n } from 'vue-i18n';

import MCDItem from '@renderer/components/MCD/Item.vue';
import MCDItemEmpty from '@renderer/components/MCD/ItemEmpty.vue';

import Filters from '@renderer/core/constants/Filters';
import { globalStore } from '@renderer/core/stores/GlobalStore';
import { filteredInventoryStore } from '@renderer/core/stores/FilteredInventoryStore';
import { dragDropStore } from '@renderer/core/stores/DragDropStore';

defineOptions({ name: 'MCDInventory' });

const { t } = useI18n();

const props = defineProps({
  disableEquipControl: { type: Boolean, default: false },
  noDragEvent: { type: Boolean, default: true },
});

const state = reactive({
  dragOver: false,
});

const State = computed(() => ({
  globalKey: globalStore.state.key,
  emptySlots: (() => {
    if (filteredInventoryStore.inventory.value.length < 12) {
      return [...Array(12 - filteredInventoryStore.inventory.value.length).keys()];
    }

    const len = filteredInventoryStore.inventory.value.length;
    return [...Array(Math.ceil(len / 3) * 3 - len).keys()];
  })(),
}));

const actions = {
  setFilter(filter) {
    filteredInventoryStore.state.filter = filter;
    if (filteredInventoryStore.inventory.value.length) {
      globalStore.setters.setItem(filteredInventoryStore.inventory.value[0]);
    } else {
      globalStore.setters.setItem(globalStore.state.selectedCharacter.inventory.gears[0]);
    }
  },
  handleDragOver(e) {
    if (!props.noDragEvent) {
      if (dragDropStore.state.from.isStored()) {
        e.preventDefault();
        state.dragOver = true;
      }
    }
  },
  handleDrop() {
    if (!props.noDragEvent) {
      dragDropStore.actions.dropToInventory(globalStore.state.selectedCharacter);
      state.dragOver = false;
    }
  },
};
</script>

<style lang="scss" src="./Inventory.scss">
</style>
