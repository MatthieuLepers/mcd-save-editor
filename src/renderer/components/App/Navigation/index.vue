<template>
  <ul class="AppNavigation">
    <li class="AppNavigationItem" :class="{active: $route.name === 'Home'}">
      <router-link :to="{ name: 'Home' }">
        <img src="static/img/UI/Inventory.png" alt="Inventory" :title="$t('App.Navigation.inventory')" />
      </router-link>
    </li>
    <li class="AppNavigationItem" :class="{active: $route.name === 'AncientHunts'}">
      <router-link :to="{ name: 'AncientHunts' }">
        <img src="static/img/UI/AncientHunts.png" alt="Ancient Hunts" :title="$t('App.Navigation.ancientHunts')" />
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'AppNavigation',
};
</script>

<style lang="scss" src="./index.scss">
</style>
