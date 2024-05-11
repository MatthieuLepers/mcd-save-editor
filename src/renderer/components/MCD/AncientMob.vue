<template>
  <label
    :for="`ancientMob${$uid}`"
    :class="GenerateModifiers('MCDAncientMob', { Selected: State.isSelected})"
  >
    <input
      type="checkbox"
      :id="`ancientMob${$uid}`"
      :checked="State.isSelected"
      :value="props.ancientMob.name"
      @click="actions.handleSelectMob"
    />
    <img
      class="MCDAncientMobImage"
      :src="image(props.ancientMob.image)"
      :alt="props.ancientMob.name"
      :title="t(`MCD.Game.AncientMobs.${props.ancientMob.name}`)"
    />

    <div class="MCDAncientMobInfos">
      <h4>{{ t(`MCD.Game.AncientMobs.${props.ancientMob.name}`) }}</h4>
      <RuneList :list="props.ancientMob.runeList" />
    </div>
  </label>
</template>

<script setup>
import { computed, ref, getCurrentInstance } from 'vue';
import { useI18n } from 'vue-i18n';

import RuneList from '@renderer/components/MCD/RuneList.vue';
import { image } from '@renderer/core/utils';

import AncientMob from '@renderer/core/classes/AncientMob';
import { ancientHuntsStore } from '@renderer/core/stores/AncientHuntsStore';

defineOptions({ name: 'MCDAncientMob' });

const $uid = ref(getCurrentInstance().uid);
const { t } = useI18n();

const props = defineProps({
  ancientMob: { type: AncientMob, required: true },
});

const State = computed(() => ({
  isSelected: ancientHuntsStore.actions.isMobPicked(props.ancientMob),
}));

const actions = {
  handleSelectMob() {
    if (!State.value.isSelected) {
      ancientHuntsStore.actions.addMob(props.ancientMob);
    } else {
      ancientHuntsStore.actions.removeMob(props.ancientMob);
    }
  },
};
</script>

<style lang="scss" src="./AncientMob.scss">
</style>
