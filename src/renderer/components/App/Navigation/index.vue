<template>
  <ul class="AppNavigation">
    <li :class="GenerateModifiers('AppNavigationItem', { Active: $route.name === 'Home' })">
      <router-link :to="{ name: 'Home' }">
        <img src="static/img/UI/Inventory.png" alt="Inventory" :title="$t('App.Navigation.inventory')" />
      </router-link>
    </li>
    <li :class="GenerateModifiers('AppNavigationItem', { Active: $route.name === 'AncientHunts' })">
      <router-link :to="{ name: 'AncientHunts' }">
        <img src="static/img/UI/AncientHunts.png" alt="Ancient Hunts" :title="$t('App.Navigation.ancientHunts')" />
      </router-link>
    </li>
    <li v-if="GlobalStore.selectedCharacter.towerData" :class="GenerateModifiers('AppNavigationItem', { Active: $route.name === 'Tower' })">
      <router-link :to="{ name: 'Tower' }">
        <img src="static/img/UI/Tower.png" alt="Tower" :title="$t('App.Navigation.tower')" />
      </router-link>
    </li>
  </ul>
</template>

<script>
import GlobalStore from '@/js/stores/GlobalStore';

export default {
  name: 'AppNavigation',
  data() {
    return { GlobalStore };
  },
};
</script>

<style lang="scss" src="./index.scss">
</style>
