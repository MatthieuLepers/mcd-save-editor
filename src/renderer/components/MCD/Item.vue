<template>
  <div
    :key="item.$key"
    :class="GenerateModifiers('MCDItem', { Selected: props.item === globalStore.state.selectedItem, DragHolded: state.isHolded, Gilded: props.item.isGilded(), [props.item.data.rarity]: true })"
    @mousedown="actions.selectItem"
    @dragover.stop="actions.handleDragOver"
    @drop.stop="actions.handleDrop"
  >
    <div class="MCDItemLevel">
      <i :class="`icon-${props.item.itemType.toLowerCase()}`"></i>
      {{ props.item.powerLevel }}
    </div>
    <i class="MCDItemSoulGathering icon-soulgathering" v-if="props.item.itemData.soulgathering"></i>
    <div class="MCDItemEnchanted" v-if="props.item.isEnchanted()">
      <i class="icon-enchanted"></i> {{ props.item.enchantmentPointsInvested }}
    </div>
    <MCDItemTile
      :rarity="props.item.data.rarity"
      :item="props.item.itemData.image || null"
      :isNew="props.item.data.markedNew"
      :isEvent="!!props.item.itemData.events && !props.showRuneList"
      @dragstart.stop="actions.handleDragStart"
      @dragend.stop="actions.handleDragEnd"
    />
    <MCDRuneList :list="props.item.runeList" v-if="props.showRuneList" />
  </div>
</template>

<script setup>
import { reactive } from 'vue';

import MCDItemTile from '@renderer/components/MCD/ItemTile.vue';
import MCDRuneList from '@renderer/components/MCD/RuneList.vue';

import Item from '@renderer/core/classes/Item';
import { globalStore } from '@renderer/core/stores/GlobalStore';
import { dragDropStore } from '@renderer/core/stores/DragDropStore';
import { tutorialStore } from '@renderer/core/tutorial/Store';

defineOptions({ name: 'MCDItem' });

const props = defineProps({
  item: { type: Item, required: true },
  showRuneList: { type: Boolean, default: false },
  noDragEvent: { type: Boolean, default: false },
  disableEquipControl: { type: Boolean, default: false },
});

const state = reactive({
  isHolded: false,
});

const actions = {
  selectItem(e) {
    if (props.showRuneList) {
      return;
    }
    globalStore.setters.setItem(props.item);
    if (props.item.data.markedNew) {
      delete props.item.data.markedNew;
    }
    tutorialStore.actions.setFullfilled('SelectItem', true);

    if (!props.disableEquipControl && (e.which === 2 || e.button === 4)) {
      e.preventDefault();
      if (props.item.isEquipped()) {
        tutorialStore.actions.setFullfilled('UnequipItem', true);
      } else {
        tutorialStore.actions.setFullfilled('EquipItem', true);
      }
      props.item[props.item.isEquipped() ? 'unequip' : 'equip']();
    }
  },
  handleDragStart() {
    if (!props.noDragEvent) {
      state.isHolded = true;
      dragDropStore.actions.setDragFrom(props.item);
    }
  },
  handleDragEnd() {
    if (!props.noDragEvent) {
      state.isHolded = false;
      tutorialStore.actions.setFullfilled('DragNDrop', false);
    }
  },
  handleDragOver(e) {
    if (!props.noDragEvent) {
      dragDropStore.actions.setDragTo(props.item);

      const itemsAreDifferent = dragDropStore.state.from !== dragDropStore.state.to;
      const oneItemIsEquipped = dragDropStore.state.from.isEquipped() || dragDropStore.state.to.isEquipped();
      const itemsAreSameType = dragDropStore.state.from.itemData.type === dragDropStore.state.to.itemData.type;

      if (itemsAreDifferent && ((oneItemIsEquipped && itemsAreSameType) || !oneItemIsEquipped)) {
        e.preventDefault();
        tutorialStore.actions.setFullfilled('DragNDrop', true, 'ValidDrop');
      } else {
        tutorialStore.actions.setFullfilled('DragNDrop', false, 'InvalidDrop');
      }
    }
  },
  handleDrop() {
    if (!props.noDragEvent) {
      dragDropStore.actions.handleDrop(globalStore.state.selectedCharacter);
      globalStore.setters.setItem(dragDropStore.state.from);
      globalStore.state.key += 1;
      tutorialStore.actions.setFullfilled('DragNDrop', true);
    }
  },
};
</script>

<style lang="scss" src="./Item.scss">
</style>
