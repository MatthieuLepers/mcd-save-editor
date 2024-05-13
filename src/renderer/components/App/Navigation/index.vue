<template>
  <ul class="AppNavigation">
    <li :class="GenerateModifiers('AppNavigationItem', { Active: route.name === 'Home' })">
      <router-link :to="{ name: 'Home' }">
        <img :src="image('img/UI/Inventory.png')" alt="Inventory" :title="t('App.Navigation.inventory')" />
      </router-link>
    </li>
    <li :class="GenerateModifiers('AppNavigationItem', { Active: route.name === 'StorageChest' })">
      <router-link :to="{ name: 'StorageChest' }">
        <img :src="image('img/UI/Storage.png')" alt="StorageChest" :title="t('App.Navigation.storageChest')" />
      </router-link>
    </li>
    <li :class="GenerateModifiers('AppNavigationItem', { Active: route.name === 'AncientHunts' })">
      <router-link :to="{ name: 'AncientHunts' }">
        <img :src="image('img/UI/AncientHunts.png')" alt="Ancient Hunts" :title="t('App.Navigation.ancientHunts')" />
      </router-link>
    </li>
    <li
      v-if="globalStore.state.selectedCharacter?.towerData"
      :class="GenerateModifiers('AppNavigationItem', { Active: route.name === 'Tower' })"
    >
      <router-link :to="{ name: 'Tower' }">
        <img :src="image('img/UI/Tower.png')" alt="Tower" :title="t('App.Navigation.tower')" />
      </router-link>
    </li>
  </ul>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

import { globalStore } from '@renderer/core/stores/GlobalStore';
import { image } from '@renderer/core/utils';

const { t } = useI18n();
const route = useRoute();

defineOptions({ name: 'AppNavigation' });
</script>

<style lang="scss" src="./index.scss">
</style>
