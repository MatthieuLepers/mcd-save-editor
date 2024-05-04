<template>
  <ul class="AppNavigation">
    <li :class="GenerateModifiers('AppNavigationItem', { Active: route.name === 'Home' })">
      <router-link :to="{ name: 'Home' }">
        <img :src="'/assets/img/UI/Inventory.png'" alt="Inventory" :title="t('App.Navigation.inventory')" />
      </router-link>
    </li>
    <li :class="GenerateModifiers('AppNavigationItem', { Active: route.name === 'StorageChest' })">
      <router-link :to="{ name: 'StorageChest' }">
        <img :src="'/assets/img/UI/Storage.png'" alt="StorageChest" :title="t('App.Navigation.storageChest')" />
      </router-link>
    </li>
    <li :class="GenerateModifiers('AppNavigationItem', { Active: route.name === 'AncientHunts' })">
      <router-link :to="{ name: 'AncientHunts' }">
        <img :src="'/assets/img/UI/AncientHunts.png'" alt="Ancient Hunts" :title="t('App.Navigation.ancientHunts')" />
      </router-link>
    </li>
  </ul>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

const { t } = useI18n();
const route = useRoute();

defineOptions({ name: 'AppNavigation' });
</script>

<style lang="scss" src="./index.scss">
</style>
