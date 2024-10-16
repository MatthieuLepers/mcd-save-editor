<template>
  <label
    :for="`ancientMob${$uid}`"
    :class="GenerateModifiers('MCDAncientMob', { Selected: State.isSelected })"
  >
    <input
      type="checkbox"
      :id="`ancientMob${$uid}`"
      :checked="State.isSelected"
      :value="props.ancientMob.id"
      @click="actions.handleSelectMob"
    />
    <img
      class="MCDAncientMobImage"
      :src="props.ancientMob.image"
      :alt="props.ancientMob.id"
      :title="props.ancientMob.getI18n('name')"
    />

    <div class="MCDAncientMobInfos">
      <h4>{{ props.ancientMob.getI18n('name') }}</h4>
      <RuneList :list="props.ancientMob.runeList" />
    </div>
  </label>
</template>

<script setup>
import { computed, ref, getCurrentInstance } from 'vue';

import RuneList from '@renderer/components/MCD/RuneList.vue';

import AncientMob from '@renderer/core/entities/ancientMob';
import { ancientHuntsStore } from '@renderer/core/stores/AncientHuntsStore';

defineOptions({ name: 'MCDAncientMob' });

const $uid = ref(getCurrentInstance().uid);

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
