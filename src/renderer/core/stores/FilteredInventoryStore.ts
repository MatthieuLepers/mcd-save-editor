import { computed, reactive } from 'vue';

import { globalStore } from '@renderer/core/stores/GlobalStore';
import Filters from '@renderer/core/constants/Filters';

const useFilteredInventoryStore = () => {
  const state = reactive({
    filter: Filters.ALL,
  });

  const inventory = computed(() => globalStore.state.selectedCharacter!.inventory.inventory.filter(state.filter.filterByItem));

  return {
    state,
    inventory,
  };
};

export const filteredInventoryStore = useFilteredInventoryStore();
