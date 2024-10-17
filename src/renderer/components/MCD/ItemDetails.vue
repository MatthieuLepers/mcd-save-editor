<template>
  <div class="MCDItemDetails" v-if="!!props.item.data.type" :key="props.item.$key">
    <div class="MCDItemDetailsInfos">
      <div class="MCDItemTitle">
        <div class="MCDItemTitleContainer">
          <div class="MCDItemTitleContainerRow">
            <span
              class="MCDItemTitlePower"
              @mouseover="actions.handleMouseOver"
              @mouseout="actions.handleMouseOut"
            >
              {{ props.item.powerLevel }}
            </span>
            <i :class="`icon-${props.item.itemType.toLowerCase()}`"></i>
          </div>
          <MCDRarityLabel :item="props.item" />
          <MCDGildedLabel :item="props.item" />
        </div>
        <MCDItemSelect v-model="props.item" />

        <ul class="MCDItemArmorProperties" v-if="props.item.isArmor()">
          <li
            :class="`MCDItemArmorPropertiesItem ${armorProperty.rarity.toLowerCase()}`"
            v-for="(armorProperty, i) in props.item.armorproperties"
            :key="i"
          >
            <img
              class="MCDItemArmorPropertiesRarity"
              :src="image(`img/UI/${armorProperty.rarity.toLowerCase()}.png`)"
              :alt="armorProperty.rarity"
            />
            <span v-if="props.item.data.type !== 'MysteryArmor'">
              {{ armorProperty.armorPropertyData.getI18n('name') }}
            </span>
            <MCDArmorPropertySelect :property="armorProperty" :item="props.item" v-else />
          </li>
        </ul>

        <MCDGildedEnchant v-model="props.item.netheriteEnchant" v-if="props.item.itemType !== 'Artefact'" />
      </div>

      <div class="MCDItemImage">
        <img :src="props.item.itemData.image" :alt="props.item.itemData.getI18n('name')" />
        <div class="MCDItemDetailsActions">
          <MCDImportButton v-if="!globalStore.state.selectedCharacter.inventory.isFull()" />
          <MCDExportButton :item="props.item" />
          <MCDCloneButton :item="props.item" v-if="props.enableClone" />
          <MCDDeleteButton :item="props.item" v-if="props.enableDelete" />
        </div>
      </div>
    </div>

    <MCDItemEnchantmentList
      v-if="props.item.itemType !== 'Artefact'"
      :item="props.item"
      @input="actions.setEnchantments"
    />
  </div>
</template>

<script setup>
import MCDItemSelect from '@renderer/components/MCD/ItemSelect.vue';
import MCDArmorPropertySelect from '@renderer/components/MCD/ArmorPropertySelect.vue';
import MCDRarityLabel from '@renderer/components/MCD/RarityLabel.vue';
import MCDGildedLabel from '@renderer/components/MCD/GildedLabel.vue';
import MCDGildedEnchant from '@renderer/components/MCD/GildedEnchant.vue';
import MCDItemEnchantmentList from '@renderer/components/MCD/ItemEnchantmentList.vue';
import MCDImportButton from '@renderer/components/MCD/ImportButton.vue';
import MCDExportButton from '@renderer/components/MCD/ExportButton.vue';
import MCDCloneButton from '@renderer/components/MCD/CloneButton.vue';
import MCDDeleteButton from '@renderer/components/MCD/DeleteButton.vue';

import GameItem from '@renderer/core/entities/item/game';
import { globalStore } from '@renderer/core/stores/GlobalStore';
import { tutorialStore } from '@renderer/core/tutorial/Store';
import { image } from '@renderer/core/utils';

defineOptions({ name: 'MCDItemDetails' });

const props = defineProps({
  item: { type: GameItem },
  enableClone: { type: Boolean, default: true },
  enableDelete: { type: Boolean, default: true },
});

const actions = {
  setEnchantments(enchantments) {
    props.item.data.enchantments = enchantments;
  },
  handleMouseOver() {
    window.onmousewheel = (e) => {
      const direction = (e.deltaY > 0 ? -1 : 1);
      props.item.data.power = Math.max(1, props.item.data.power + (direction / 10));
      tutorialStore.actions.setFullfilled('ChangeLevel', true);
    };
  },
  handleMouseOut() {
    window.onmousewheel = null;
  },
};
</script>

<style lang="scss" src="./ItemDetails.scss">
</style>
