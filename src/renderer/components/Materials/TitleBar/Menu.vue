<template>
  <div class="m-title-bar__menu-ctn" ref="root">
    <ul class="m-title-bar__menu">
      <TitleBarMenuItem
        v-for="(menuName, i) in props.menuList"
        :key="`menu${i}`"
        :id="menuName"
        :label="t(`App.TitleBarMenu.${menuName}.label`)"
        @click.stop.prevent="(e, menuName) => actions.toggleMenu(menuName)"
      >
        <slot :name="menuName" :visible="menuName === state.activeMenu" :close="actions.closeMenu" />
      </TitleBarMenuItem>
    </ul>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import TitleBarMenuItem from '@renderer/components/Materials/TitleBar/MenuItem.vue';

defineOptions({ name: 'TitleBarMenu' });

const { t } = useI18n();

const root = ref(null);

const props = defineProps({
  menuList: { type: Array, default: () => [] },
});

const state = reactive({
  activeMenu: null,
});

const actions = {
  handleWindowClick(e) {
    if (!e.target.matches('.TitleBarMenuCtn') && !e.target.closest('.TitleBarMenuCtn') && e.target !== root.value) {
      state.activeMenu = null;
      window.removeEventListener('click', actions.handleWindowClick);
    }
  },
  toggleMenu(menu) {
    if (state.activeMenu === menu) {
      state.activeMenu = null;
    } else {
      state.activeMenu = menu;
      window.addEventListener('click', actions.handleWindowClick);
    }
  },
  closeMenu() {
    state.activeMenu = null;
  },
};
</script>

<style lang="scss" src="./Menu.scss">
</style>
