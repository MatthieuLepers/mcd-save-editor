<template>
  <main class="AncientHuntsPage Page">
    <div class="AncientHuntsPage--Left">
      <MCDAncientMob
        v-for="(mob, i) in State.mobList"
        :key="i"
        :ancientMob="mob"
      />
    </div>
    <div class="AncientHuntsPage--Right">
      <MCDButton
        class="AncientHuntsPageButtonReset"
        icon="close"
        :title="t('MCD.AncientHunts.reset')"
        @click="actions.reset"
      />
      <MCDButton
        class="AncientHuntsPageButtonReload"
        icon="reload"
        :title="t('MCD.AncientHunts.refresh')"
        @click="actions.refresh"
      />

      <div class="AncientHuntsPageRuneList" v-if="ancientHuntsStore.runeList.value.length">
        <h6>{{ t('MCD.AncientHunts.invocationRunes') }}</h6>
        <MCDRuneList :list="State.invocationRuneList" :compress="true" />
        <div class="AncientHuntsPageRuneList--ResidualList" v-if="!State.residualRuneList.isEmpty()">
          <h6>{{ t('MCD.AncientHunts.residualRunes', { pluralize: State.residualRuneList.length > 1 ? 's' : '' }) }}</h6>
          <MCDRuneList :list="State.residualRuneList" :compress="true" />
        </div>
      </div>

      <div class="AncientHuntsPageItemList">
        <component
          :is="!!item ? MCDItem : MCDItemEmpty"
          v-for="(item, i) in state.foundOffers"
          :key="i"
          :item="item"
          :itemType="Object.values(ItemTypeEnum)[i]"
          :showRuneList="true"
          :noDragEvent="true"
        />
      </div>

      <MCDButton
        class="AncientHuntsPageButtonAdd"
        variant="success"
        :label="t('MCD.AncientHunts.button')"
        :disabled="!State.foundOffersWithoutNull.length"
        @click="actions.addOffersToInventory"
      />
    </div>
  </main>
</template>

<script setup>
import {
  reactive,
  computed,
  watch,
  onMounted,
} from 'vue';
import { useI18n } from 'vue-i18n';

import AncientMob from '@renderer/core/classes/AncientMob';
import { ItemTypeEnum } from '@renderer/core/classes/enums/ItemTypeEnum';
import RuneList from '@renderer/core/classes/RuneList';
import { globalStore } from '@renderer/core/stores/GlobalStore';
import { ancientHuntsStore } from '@renderer/core/stores/AncientHuntsStore';
import AncientMobsData from '@renderer/core/data/AncientMobs';

import MCDAncientMob from '@renderer/components/MCD/AncientMob.vue';
import MCDItem from '@renderer/components/MCD/Item.vue';
import MCDItemEmpty from '@renderer/components/MCD/ItemEmpty.vue';
import MCDRuneList from '@renderer/components/MCD/RuneList.vue';
import MCDButton from '@renderer/components/MCD/Button.vue';

import { notificationStore } from '@renderer/components/Materials/Notification/Store';

defineOptions({ name: 'AncientHuntsPage' });

const { t } = useI18n();

const state = reactive({
  foundOffers: [null, null, null, null],
});

const State = computed(() => {
  const mobList = Object
    .values(AncientMobsData)
    .map((mobData) => new AncientMob(mobData))
    .sort((a, b) => t(`MCD.Game.AncientMobs.${a.name}`).localeCompare(t(`MCD.Game.AncientMobs.${b.name}`)))
  ;
  const foundOffersWithoutNull = state.foundOffers.filter((item) => !!item);
  const invocationRuneList = ancientHuntsStore.runeList.value;
  const residualRuneList = state.foundOffers
    .filter((item) => !!item)
    .reduce((acc, val) => acc.add(val.runeList), new RuneList())
    .sub(invocationRuneList)
  ;

  return {
    mobList,
    foundOffersWithoutNull,
    invocationRuneList,
    residualRuneList,
  };
});

const actions = {
  addOffersToInventory() {
    let count = 0;
    const itemList = State.value.foundOffersWithoutNull.slice();
    if (globalStore.state.selectedCharacter.inventory.getAvailableSlotCount() >= itemList.length) {
      itemList.forEach((item) => {
        globalStore.state.selectedCharacter.inventory.addItem(item);
        count += 1;
      });
      notificationStore.actions.success(t('MCD.AncientHunts.successMessage', { count, pluralize: count > 1 ? 's' : '' }));
      state.foundOffers = ancientHuntsStore.actions.findOffers();
    } else {
      notificationStore.actions.error(t('MCD.AncientHunts.errorMessage'));
    }
  },
  refresh() {
    if (ancientHuntsStore.state.ancientMobList.length) {
      state.foundOffers = ancientHuntsStore.actions.findOffers();
    }
  },
  reset() {
    ancientHuntsStore.state.ancientMobList = [];
  },
};

onMounted(() => {
  actions.reset();
});

watch(() => ancientHuntsStore.state, () => {
  state.foundOffers = ancientHuntsStore.actions.findOffers();
}, { deep: true });
</script>

<style lang="scss" src="./index.scss">
</style>
