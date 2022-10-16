<template>
  <div class="MCDInventory" :key="globalKey">
    <div class="MCDInventoryFilters">
      <button v-for="(filter, i) in Object.values(Filters)" :key="i" :class="GenerateModifiers('MCDInventoryFilter', { Selected: FilteredInventoryStore.filter === filter })" @click="setFilter(filter)">
        <span>{{ $t(`MCD.Inventory.filters.${filter.name}`) }}</span>
        <i :class="`icon-${filter.icon}`"></i>
      </button>
    </div>
    <div
      :class="GenerateModifiers('MCDInventoryItems', { Over: dragOver })"
      @dragover.stop="handleDragOver"
      @dragleave.stop="dragOver = false"
      @drop.stop="handleDrop"
    >
      <MCDItem
        v-for="(item, i) in FilteredInventoryStore.inventory"
        :key="i"
        :item="item"
        :disableEquipControl="disableEquipControl"
        :noDragOverEvent="!noDragEvent"
        :noDropEvent="!noDragEvent"
      />
      <MCDItemEmpty
        v-for="(slot, i) in emptySlots"
        :key="FilteredInventoryStore.inventory.length + i"
        :noDragEvent="true"
        :cross="true"
      />
    </div>
  </div>
</template>

<script>
import GlobalStore from '@/assets/js/stores/GlobalStore';
import Filters from '@/assets/js/constants/Filters';
import FilteredInventoryStore from '@/assets/js/stores/FilteredInventoryStore';
import DragDropStore from '@/assets/js/stores/DragDropStore';

import MCDItem from './Item';
import MCDItemEmpty from './ItemEmpty';

export default {
  name: 'MCDInventory',
  components: { MCDItem, MCDItemEmpty },
  props: {
    disableEquipControl: { type: Boolean, default: false },
    noDragEvent: { type: Boolean, default: true },
  },
  data() {
    return {
      Filters,
      FilteredInventoryStore,
      dragOver: false,
    };
  },
  computed: {
    globalKey() {
      return GlobalStore.key;
    },
    emptySlots() {
      if (FilteredInventoryStore.inventory.length < 12) {
        return [...Array(12 - FilteredInventoryStore.inventory.length).keys()];
      }

      const len = FilteredInventoryStore.inventory.length;
      return [...Array(Math.ceil(len / 3) * 3 - len).keys()];
    },
  },
  methods: {
    setFilter(filter) {
      FilteredInventoryStore.filter = filter;
      if (FilteredInventoryStore.inventory.length) {
        [GlobalStore.selectedItem] = FilteredInventoryStore.inventory;
      } else {
        [GlobalStore.selectedItem] = GlobalStore.selectedCharacter.inventory.gears;
      }
    },
    handleDragOver(e) {
      if (!this.noDragEvent) {
        if (DragDropStore.from.isStored()) {
          e.preventDefault();
          this.dragOver = true;
        }
      }
    },
    handleDrop() {
      if (!this.noDragEvent) {
        DragDropStore.dropToInventory(GlobalStore.selectedCharacter);
        this.dragOver = false;
      }
    },
  },
};
</script>

<style lang="scss" src="./Inventory.scss">
</style>
