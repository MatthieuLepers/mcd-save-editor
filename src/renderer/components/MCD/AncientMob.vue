<template>
  <label :for="`ancientMob${_uid}`" :class="GenerateModifiers('MCDAncientMob', { Selected: isSelected})">
    <input type="checkbox" :id="`ancientMob${_uid}`" :checked="isSelected" :value="ancientMob.name" @click="handleSelectMob" />
    <img class="MCDAncientMobImage" :src="ancientMob.image" :alt="ancientMob.name" :title="$t(`MCD.Game.AncientMobs.${ancientMob.name}`)" />

    <div class="MCDAncientMobInfos">
      <h4>{{ $t(`MCD.Game.AncientMobs.${ancientMob.name}`) }}</h4>
      <RuneList :list="ancientMob.runeList" />
    </div>
  </label>
</template>

<script>
import AncientMob from '@/assets/js/classes/AncientMob';
import AncientHuntsStore from '@/assets/js/stores/AncientHuntsStore';
import RuneList from '@/components/MCD/RuneList';

export default {
  name: 'MCDAncientMob',
  components: { RuneList },
  props: {
    ancientMob: { type: AncientMob, required: true },
  },
  computed: {
    isSelected() {
      return AncientHuntsStore.isMobPicked(this.ancientMob);
    },
  },
  methods: {
    handleSelectMob() {
      if (!this.isSelected) {
        AncientHuntsStore.addMob(this.ancientMob);
      } else {
        AncientHuntsStore.removeMob(this.ancientMob);
      }
    },
  },
};
</script>

<style lang="scss" src="./AncientMob.scss">
</style>
