<template>
  <main class="TowerPage Page">
    <MCDCharacter :character="props.character" :key="globalStore.state.key">
      <template v-slot:header>
        <MCDCurrency v-model="state.currentPlayer.data.playerArrowsAmmount" image="img/UI/ArrowBundle.png" imageAlt="Arrow" />
        <MCDCurrency v-model="state.currentPlayer.data.playerEnchantmentPointsGranted" image="img/UI/EnchantmentPoint.png" imageAlt="EnchantmentPoint" />
      </template>
      <template v-slot:Column1>
        <MCDTowerConfiguration :towerData="props.character.towerData" />
      </template>
      <template v-slot:Column2>
        <MCDGears
          :gears="state.currentPlayer.gears"
          :hotbar="state.currentPlayer.hotbar"
        />
      </template>
      <template v-slot:Column3>
        <MCDItemDetails
          v-if="!!globalStore.state.selectedItem"
          :item="globalStore.state.selectedItem"
          :enableClone="false"
          :enableDelete="false"
        />
      </template>
      <MCDEnchantmentEditor :towerMode="true" />
    </MCDCharacter>
  </main>
</template>

<script setup>
import { reactive, onBeforeMount } from 'vue';

import MCDCharacter from '@renderer/components/MCD/Character.vue';
import MCDCurrency from '@renderer/components/MCD/Currency.vue';
import MCDGears from '@renderer/components/MCD/Gears.vue';
import MCDItemDetails from '@renderer/components/MCD/ItemDetails.vue';
import MCDEnchantmentEditor from '@renderer/components/MCD/EnchantmentEditor.vue';
import MCDTowerConfiguration from '@renderer/components/MCD/TowerConfiguration.vue';

import { globalStore } from '@renderer/core/stores/GlobalStore';
import Character from '@renderer/core/classes/Character';

defineOptions({ name: 'TowerPage' });

const props = defineProps({
  character: { type: Character, required: true },
});

const state = reactive({
  currentPlayer: null,
});

onBeforeMount(() => {
  [state.currentPlayer] = props.character.towerData.towerInfo.players;
  globalStore.setters.setItem(state.currentPlayer.gears[0]);
});
</script>

<style lang="scss" src="./index.scss">
</style>
