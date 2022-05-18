<template>
  <div class="MCDCloneButton">
    <MCDButton class="MCDButtonClone" icon="duplicate" :title="$t('MCD.CloneButton.label')" size="xs" @click="cloneItem" />
  </div>
</template>

<script>
import GlobalStore from '@/assets/js/stores/GlobalStore';
import FilteredInventoryStore from '@/assets/js/stores/FilteredInventoryStore';
import Item from '@/assets/js/classes/Item';

import MCDButton from './Button';

export default {
  name: 'MCDCloneButton',
  components: { MCDButton },
  props: {
    item: { type: Item, required: true },
  },
  methods: {
    cloneItem() {
      GlobalStore.selectedCharacter.inventory.addItem(this.item.clone());
      if (FilteredInventoryStore.inventory.length) {
        [GlobalStore.selectedItem] = FilteredInventoryStore.inventory;
      } else {
        [GlobalStore.selectedItem] = GlobalStore.selectedCharacter.inventory.gears;
      }
    },
  },
};
</script>

<style lang="scss" src="./CloneButton.scss">
</style>
