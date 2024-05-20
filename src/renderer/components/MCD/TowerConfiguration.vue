<template>
  <section class="MCDTowerConfiguration">
    <h2 class="MCDTowerConfigurationTitle">
      {{ t('MCD.TowerConfiguration.title') }}
    </h2>
    <ol class="MCDTowerConfigurationFloorList">
      <MCDTowerFloor
        v-for="(floor, i) in props.towerData.towerInfo.config.floors"
        :key="i"
        :index="i"
        :current="props.towerData.towerInfo.data.towerInfo.towerInfoCurrentFloor"
        :floor="floor"
        :totalFloors="props.towerData.towerInfo.config.floors.length - 1"
        @edit="actions.handleEditFloor(floor, i)"
      />
    </ol>
    <Modal
      name="towerConfigModal"
      title="Modification de l'étage"
    />
  </section>
</template>

<script setup>
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';

import Modal from '@renderer/components/Materials/Modal/index.vue';
import MCDTowerFloor from '@renderer/components/MCD/TowerFloor.vue';

import { modalStore } from '@renderer/components/Materials/Modal/Store';
import TowerData from '@renderer/core/classes/tower/TowerData';

defineOptions({ name: 'MCDTowerConfiguration' });

const { t } = useI18n();

const props = defineProps({
  towerData: { type: TowerData, required: true },
});

const state = reactive({
  selectedFloor: null,
});

const actions = {
  handleEditFloor(floor) {
    state.selectedFloor = floor;
    modalStore.actions.show('towerConfigModal');
    console.log(floor);
  },
};
</script>

<style lang="scss" src="./TowerConfiguration.scss">
</style>
