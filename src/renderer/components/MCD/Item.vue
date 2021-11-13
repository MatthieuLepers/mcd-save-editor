<template>
  <div
    :key="item.$key"
    :class="GenerateModifiers('MCDItem', { Selected: item === GlobalStore.selectedItem, DragHolded: isHolded, Gilded: item.isGilded() })"
    @mousedown="selectItem"
    @dragover.stop="handleDragOver"
    @drop.stop="handleDrop"
  >
    <div class="MCDItemLevel">
      <i :class="`icon-${item.itemType.toLowerCase()}`"></i>
      {{ item.powerLevel }}
    </div>
    <i class="MCDItemSoulGathering icon-soulgathering" v-if="item.itemData.soulgathering"></i>
    <div class="MCDItemEnchanted" v-if="item.isEnchanted()">
      <i class="icon-enchanted"></i> {{ item.enchantmentPointsInvested }}
    </div>
    <MCDItemTile
      :rarity="item.$data.rarity"
      :item="item.itemData.image || null"
      :isNew="item.$data.markedNew"
      :isEvent="!!item.itemData.event && !showRuneList"
      @dragstart.stop="handleDragStart"
      @dragend.stop="handleDragEnd"
    />
    <MCDRuneList :list="item.runeList" v-if="showRuneList" />
  </div>
</template>

<script>
import Item from '@/js/classes/Item';
import GlobalStore from '@/js/stores/GlobalStore';
import DragDropStore from '@/js/stores/DragDropStore';
import TutorialStore from '@/js/tutorial/Store';

import MCDItemTile from './ItemTile';
import MCDRuneList from './RuneList';

export default {
  name: 'MCDItem',
  components: { MCDItemTile, MCDRuneList },
  props: {
    item: { type: Item, required: true },
    showRuneList: { type: Boolean, default: false },
    noDragEvent: { type: Boolean, default: false },
  },
  data() {
    return {
      GlobalStore,
      isHolded: false,
    };
  },
  methods: {
    selectItem(e) {
      if (this.showRuneList) {
        return;
      }
      GlobalStore.selectedItem = this.item;
      if (this.item.$data.markedNew) {
        delete this.item.$data.markedNew;
      }
      TutorialStore.setFullfilled('SelectItem', true);

      if (e.which === 2 || e.button === 4) {
        e.preventDefault();
        if (this.item.isEquipped()) {
          TutorialStore.setFullfilled('UnequipItem', true);
        } else {
          TutorialStore.setFullfilled('EquipItem', true);
        }
        this.item[this.item.isEquipped() ? 'unequip' : 'equip']();
      }
    },
    handleDragStart() {
      if (!this.noDragEvent) {
        this.isHolded = true;
        DragDropStore.setDragFrom(this.item);
      }
    },
    handleDragEnd() {
      if (!this.noDragEvent) {
        this.isHolded = false;
        TutorialStore.setFullfilled('DragNDrop', false);
      }
    },
    handleDragOver(e) {
      if (!this.noDragEvent) {
        DragDropStore.setDragTo(this.item);

        const itemsAreDifferent = DragDropStore.from !== DragDropStore.to;
        const oneItemIsEquipped = DragDropStore.from.isEquipped() || DragDropStore.to.isEquipped();
        const itemsAreSameType = DragDropStore.from.itemData.type === DragDropStore.to.itemData.type;

        if (itemsAreDifferent && ((oneItemIsEquipped && itemsAreSameType) || !oneItemIsEquipped)) {
          e.preventDefault();
          TutorialStore.setFullfilled('DragNDrop', true, 'ValidDrop');
        } else {
          TutorialStore.setFullfilled('DragNDrop', false, 'InvalidDrop');
        }
      }
    },
    handleDrop() {
      if (!this.noDragEvent) {
        DragDropStore.handleDrop(GlobalStore.selectedCharacter);
        GlobalStore.selectedItem = DragDropStore.from;
        GlobalStore.key += 1;
        TutorialStore.setFullfilled('DragNDrop', true);
      }
    },
  },
};
</script>

<style lang="scss" src="./Item.scss">
</style>
