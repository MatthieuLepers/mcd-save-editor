<template>
  <div class="MCDInventory" :key="GlobalStore.key">
    <div class="MCDInventoryFilters">
      <button v-for="(filter, i) in Object.values(Filters)" :key="i" :class="GenerateModifiers('MCDInventoryFilter', { Selected: FilteredInventoryStore.filter === filter })" @click="setFilter(filter)">
        <span>{{ $t(`MCD.Inventory.filters.${filter.name}`) }}</span>
        <i :class="`icon-${filter.icon}`"></i>
      </button>
    </div>
    <div class="MCDInventoryItems">
      <MCDItem
        v-for="(item, i) in FilteredInventoryStore.inventory"
        :key="i"
        :item="item"
        :disableEquipControl="disableEquipControl"
      />
    </div>
  </div>
</template>

<script>
import GlobalStore from '@/assets/js/stores/GlobalStore';
import Filters from '@/assets/js/constants/Filters';
import FilteredInventoryStore from '@/assets/js/stores/FilteredInventoryStore';

import MCDItem from './Item';

export default {
  name: 'MCDInventory',
  components: { MCDItem },
  props: {
    disableEquipControl: { type: Boolean, default: false },
  },
  data() {
    return {
      GlobalStore,
      Filters,
      FilteredInventoryStore,
    };
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
  },
};
</script>

<style lang="scss" src="./Inventory.scss">
</style>
