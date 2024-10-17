<template>
  <div class="MCDCloneButton">
    <MCDButton
      class="MCDButtonClone"
      icon="duplicate"
      :title="t('MCD.CloneButton.label')"
      size="xs"
      @click="actions.cloneItem"
    />
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

import MCDButton from '@renderer/components/MCD/Button.vue';

import { globalStore } from '@renderer/core/stores/GlobalStore';
import { filteredInventoryStore } from '@renderer/core/stores/FilteredInventoryStore';
import GameItem from '@renderer/core/entities/item/game';

defineOptions({ name: 'MCDCloneButton' });

const { t } = useI18n();

const props = defineProps({
  item: { type: GameItem, required: true },
});

const actions = {
  cloneItem() {
    if (props.item.isStored()) {
      globalStore.state.selectedCharacter.storageChest.addItem(props.item.clone());
      globalStore.setters.setItem(globalStore.state.selectedCharacter.storageChest.items[0]);
    } else {
      globalStore.state.selectedCharacter.inventory.addItem(props.item.clone());
      if (filteredInventoryStore.inventory.value.length) {
        globalStore.setters.setItem(filteredInventoryStore.inventory.value[0]);
      } else {
        globalStore.setters.setItem(globalStore.state.selectedCharacter.inventory.gears[0]);
      }
    }
  },
};
</script>

<style lang="scss" src="./CloneButton.scss">
</style>
