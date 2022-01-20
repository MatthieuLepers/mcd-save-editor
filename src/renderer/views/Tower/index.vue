<template>
  <main class="TowerPage Page">
    <MCDCharacter :character="character" :key="GlobalStore.key">
      <template v-slot:header>
        <MCDCurrency v-model="character.towerData.towerInfo.$data.towerArrowsAmount" image="static/img/UI/ArrowBundle.png" imageAlt="Arrow" />
        <MCDCurrency v-model="character.towerData.towerInfo.enchantmentPoints" image="static/img/UI/EnchantmentPoint.png" imageAlt="EnchantmentPoint" />
      </template>
      <template v-slot:Column1>
        <MCDTowerConfiguration :towerData="character.towerData" />
      </template>
      <template v-slot:Column2>
        <MCDGears
          :gears="character.towerData.towerInfo.gears"
          :hotbar="character.towerData.towerInfo.hotbar"
        />
      </template>
      <template v-slot:Column3>
        <MCDItemDetails
          v-if="!!GlobalStore.selectedItem"
          :item="GlobalStore.selectedItem"
          :enableClone="false"
          :enableDelete="false"
        />
      </template>
      <MCDEnchantmentEditor :towerMode="true" />
    </MCDCharacter>
  </main>
</template>

<script>
import GlobalStore from '@/js/stores/GlobalStore';
import Character from '@/js/classes/Character';

import MCDCharacter from '@/components/MCD/Character';
import MCDCurrency from '@/components/MCD/Currency';
import MCDGears from '@/components/MCD/Gears';
import MCDItemDetails from '@/components/MCD/ItemDetails';
import MCDEnchantmentEditor from '@/components/MCD/EnchantmentEditor';
import MCDTowerConfiguration from '@/components/MCD/TowerConfiguration';

export default {
  name: 'TowerPage',
  components: { MCDCharacter, MCDCurrency, MCDGears, MCDItemDetails, MCDEnchantmentEditor, MCDTowerConfiguration },
  props: {
    character: { type: Character, required: true },
  },
  data() {
    return { GlobalStore };
  },
  mounted() {
    [GlobalStore.selectedItem] = this.character.towerData.towerInfo.gears;
  },
};
</script>

<style lang="scss" src="./index.scss">
</style>
