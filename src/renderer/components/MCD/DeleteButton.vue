<template>
  <div class="MCDDeleteButton">
    <MCDButton class="MCDButtonDelete" icon="delete" :title="$t('MCD.DeleteButton.label')" size="xs" @click="removeItem" />
  </div>
</template>

<script>
import GlobalStore from '@/js/stores/GlobalStore';
import FilteredInventoryStore from '@/js/stores/FilteredInventoryStore';
import Item from '@/js/classes/Item';

import MCDButton from './Button';

export default {
  name: 'MCDDeleteButton',
  components: { MCDButton },
  props: {
    item: { type: Item, required: true },
  },
  methods: {
    removeItem() {
      GlobalStore.selectedCharacter.inventory.removeItem(this.item);
      if (FilteredInventoryStore.inventory.length) {
        [GlobalStore.selectedItem] = FilteredInventoryStore.inventory;
      } else {
        [GlobalStore.selectedItem] = GlobalStore.selectedCharacter.inventory.gears;
      }
    },
  },
};
</script>

<style lang="scss" src="./DeleteButton.scss">
</style>
