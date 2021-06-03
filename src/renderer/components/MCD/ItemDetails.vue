<template>
  <div class="MCDItemDetails" v-if="!!item.$data.type" :key="item.$key">
    <div class="MCDItemDetailsInfos">
      <div class="MCDItemTitle">
        <div class="MCDItemTitleContainer">
          <div class="MCDItemTitleContainerRow">
            <span
              class="MCDItemTitlePower"
              @mouseover="handleMouseOver"
              @mouseout="handleMouseOut"
            >
              {{ item.powerLevel }}
            </span>
            <i :class="`icon-${item.itemType.toLowerCase()}`"></i>
          </div>
          <MCDRarityLabel :item="item" />
          <MCDGildedLabel :item="item" />
        </div>
        <MCDItemSelect v-model="item" />

        <ul class="MCDItemArmorProperties" v-if="item.isArmor()">
          <li :class="`MCDItemArmorPropertiesItem ${armorProperty.rarity.toLowerCase()}`" v-for="(armorProperty, i) in item.armorproperties" :key="i">
            <img class="MCDItemArmorPropertiesRarity" :src="`static/img/UI/${armorProperty.rarity.toLowerCase()}.png`" :alt="armorProperty.rarity" />
            <span v-if="item.$data.type !== 'MysteryArmor'">{{ $t(`MCD.Game.ArmorProperties.${armorProperty.armorPropertyIdentifier}`) }}</span>
            <MCDArmorPropertySelect :property="armorProperty" :item="item" v-else />
          </li>
        </ul>

        <MCDGildedEnchant v-model="item.netheriteEnchant" v-if="item.itemType !== 'Artefact'" />
      </div>

      <div class="MCDItemImage">
        <img :src="item.itemData.image" :alt="$t(`MCD.Game.Items.${item.$data.type}`)" />
        <div class="MCDItemDetailsActions">
          <MCDImportButton v-if="!GlobalStore.selectedCharacter.inventory.isFull()" />
          <MCDExportButton :item="item" />
          <MCDDeleteButton :item="item" />
        </div>
      </div>
    </div>

    <MCDItemEnchantmentList v-if="item.itemType !== 'Artefact'" :item="item" @input="setEnchantments" />
  </div>
</template>

<script>
import GlobalStore from '@/js/stores/GlobalStore';
import TutorialStore from '@/js/tutorial/Store';
import Item from '@/js/classes/Item';

import MCDItemSelect from './ItemSelect';
import MCDArmorPropertySelect from './ArmorPropertySelect';
import MCDRarityLabel from './RarityLabel';
import MCDGildedLabel from './GildedLabel';
import MCDGildedEnchant from './GildedEnchant';
import MCDItemEnchantmentList from './ItemEnchantmentList';
import MCDImportButton from './ImportButton';
import MCDExportButton from './ExportButton';
import MCDDeleteButton from './DeleteButton';

export default {
  name: 'MCDItemDetails',
  components: { MCDRarityLabel, MCDGildedLabel, MCDGildedEnchant, MCDItemEnchantmentList, MCDImportButton, MCDExportButton, MCDDeleteButton, MCDItemSelect, MCDArmorPropertySelect },
  props: {
    item: { type: Item, required: true },
  },
  data() {
    return { GlobalStore };
  },
  methods: {
    setEnchantments(enchantments) {
      this.item.$data.enchantments = enchantments;
    },
    handleMouseOver() {
      window.onmousewheel = (e) => {
        const direction = (e.deltaY > 0 ? -1 : 1);
        this.item.$data.power += direction / 10;
        TutorialStore.setFullfilled('ChangeLevel', true);
      };
    },
    handleMouseOut() {
      window.onmousewheel = null;
    },
  },
};
</script>

<style lang="scss" src="./ItemDetails.scss">
</style>
