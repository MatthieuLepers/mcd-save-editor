<template>
  <section class="MCDTowerConfiguration">
    <h2 class="MCDTowerConfigurationTitle">
      {{ $t('MCD.TowerConfiguration.title') }}
    </h2>
    <ol class="MCDTowerConfigurationFloorList">
      <MCDTowerFloor
        v-for="(floor, i) in towerData.towerInfo.config.floors"
        :key="i"
        :index="i"
        :current="towerData.towerInfo.$data.towerInfo.towerInfoCurrentFloor"
        :floor="floor"
        @edit="handleEditFloor(floor, i)"
      />
    </ol>
    <Modal
      name="towerConfigModal"
      title="Modification de l'étage"
      :okCancel="true"
    ></Modal>
  </section>
</template>

<script>
import TowerData from '@/js/classes/tower/TowerData';
import MCDTowerFloor from '@/components/MCD/TowerFloor';
import Modal from '@/components/Modal/index';
import ModalStore from '@/components/Modal/Store';

export default {
  name: 'MCDTowerConfiguration',
  components: { MCDTowerFloor, Modal },
  props: {
    towerData: { type: TowerData, required: true },
  },
  data() {
    return {
      selectedFloor: null,
    };
  },
  methods: {
    handleEditFloor(floor) {
      this.selectedFloor = floor;
      ModalStore.showModal('towerConfigModal');
    },
  },
};
</script>

<style lang="scss" src="./TowerConfiguration.scss">
</style>
