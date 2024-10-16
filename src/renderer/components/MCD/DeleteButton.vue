<template>
  <div class="MCDDeleteButton">
    <MCDButton
      class="MCDButtonDelete"
      icon="delete"
      :title="t('MCD.DeleteButton.label')"
      size="xs"
      @click="actions.removeItem"
    />
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

import MCDButton from '@renderer/components/MCD/Button.vue';

import { globalStore } from '@renderer/core/stores/GlobalStore';
import { filteredInventoryStore } from '@renderer/core/stores/FilteredInventoryStore';
import GameItem from '@renderer/core/entities/item/game';

defineOptions({ name: 'MCDDeleteButton' });

const { t } = useI18n();

const props = defineProps({
  item: { type: GameItem, required: true },
});

const actions = {
  removeItem() {
    if (props.item.isStored()) {
      globalStore.state.selectedCharacter.storageChest.removeItem(props.item);
      globalStore.setters.setItem(globalStore.state.selectedCharacter.storageChest.items[0]);
    } else {
      globalStore.state.selectedCharacter.inventory.removeItem(props.item);
      if (filteredInventoryStore.inventory.value.length) {
        globalStore.setters.setItem(filteredInventoryStore.inventory.value[0]);
      } else {
        globalStore.setters.setItem(globalStore.selectedCharacter.inventory.gears[0]);
      }
    }
  },
};
</script>

<style lang="scss" src="./DeleteButton.scss">
</style>
