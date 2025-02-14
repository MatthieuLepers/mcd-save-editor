<template>
  <div class="m-title-bar__menu-ctn" ref="root">
    <ul class="m-title-bar__menu">
      <TitleBarMenuItem
        v-for="(menuName, i) in props.menuList"
        :key="`menu${i}`"
        :id="menuName"
        :label="t(`App.TitleBarMenu.${menuName}.label`)"
        @click.stop.prevent="(_e, menuName) => actions.toggleMenu(menuName)"
      >
        <slot :name="menuName" :visible="menuName === state.activeMenu" :close="actions.closeMenu" />
      </TitleBarMenuItem>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import TitleBarMenuItem from '@renderer/components/Materials/TitleBar/MenuItem.vue';
import type { ISlots, IProps, IState } from './Menu';

defineOptions({ name: 'TitleBarMenu' });

defineSlots<ISlots>();

const { t } = useI18n();

const root = ref<HTMLElement | null>(null);

const props = withDefaults(defineProps<IProps>(), {
  menuList: () => [],
});

const state = reactive<IState>({
  activeMenu: undefined,
});

const actions = {
  handleWindowClick(e: Event) {
    const target = e.target as HTMLElement;
    if (!target.matches('.TitleBarMenuCtn') && !target.closest('.TitleBarMenuCtn') && e.target !== root.value) {
      state.activeMenu = undefined;
      window.removeEventListener('click', actions.handleWindowClick);
    }
  },
  toggleMenu(menu: string) {
    if (state.activeMenu === menu) {
      state.activeMenu = undefined;
    } else {
      state.activeMenu = menu;
      window.addEventListener('click', actions.handleWindowClick);
    }
  },
  closeMenu() {
    state.activeMenu = undefined;
  },
};
</script>

<style lang="scss" src="./Menu.scss">
</style>
