<template>
  <div class="TitleBarMenuCtn">
    <ul class="TitleBarMenu">
      <TitleBarMenuItem id="file" :label="$t('TitleBarMenu.fileMenu.label')" @click="toggleSubMenu('file')">
        <ContextMenu :visible="activeMenu === 'file'">
          <ContextMenuSubMenu :label="$t('TitleBarMenu.fileMenu.selectProfil')" @hover="activeSubMenu = 'selectProfil'" @out="activeSubMenu = null">
            <ContextMenu :visible="activeSubMenu === 'selectProfil'" position="top right">
              <ContextMenuItem v-for="(profil, i) in profilList" :key="i" :label="profil.id" :icon="getProfilIcon(profil)" @click="handleClickedProfil(profil)" />
            </ContextMenu>
          </ContextMenuSubMenu>
          <ContextMenuSeparator />
          <ContextMenuItem :label="$t('TitleBarMenu.fileMenu.exit')" @click="handleCloseBtn" shortcut="Alt+F4" />
        </ContextMenu>
      </TitleBarMenuItem>

      <TitleBarMenuItem id="lang" :label="$t('TitleBarMenu.langMenu.label')" @click="toggleSubMenu('lang')">
        <ContextMenu :visible="activeMenu === 'lang'">
          <ContextMenuItem v-for="({ lang, iso }, i) in langList" :key="i" :label="$t(`TitleBarMenu.langMenu.${lang}`)" :icon="getLangIcon(iso)" @click="handleSetLocale(iso)" />
        </ContextMenu>
      </TitleBarMenuItem>
    </ul>
  </div>
</template>

<script>
import { remote } from 'electron';

import Settings from '@/assets/js/AppSettings';
import GlobalStore from '@/assets/js/stores/GlobalStore';

import ContextMenu from '@/components/ContextMenu/index';
import ContextMenuItem from '@/components/ContextMenu/Item';
import ContextMenuSubMenu from '@/components/ContextMenu/SubMenu';
import ContextMenuSeparator from '@/components/ContextMenu/Separator';

import TitleBarMenuItem from './MenuItem';

export default {
  name: 'TitleBarMenu',
  components: { TitleBarMenuItem, ContextMenu, ContextMenuItem, ContextMenuSubMenu, ContextMenuSeparator },
  data() {
    return {
      window: remote.getCurrentWindow(),
      activeMenu: null,
      activeSubMenu: null,
      profilList: GlobalStore.profilList,
      GlobalStore,
    };
  },
  methods: {
    handleCloseBtn() {
      window.close();
    },
    handleWindowClick(e) {
      if (!e.target.matches('.TitleBarMenuCtn') && !e.target.closest('.TitleBarMenuCtn') && e.target !== this.$el) {
        this.activeMenu = null;
        window.removeEventListener('click', this.handleWindowClick);
      }
    },
    toggleSubMenu(submenu) {
      this.activeMenu = (this.activeMenu ? null : submenu);

      if (this.activeMenu === submenu) {
        window.addEventListener('click', this.handleWindowClick);
      }
    },
    handleClickedProfil(profil) {
      GlobalStore.selectedProfil = profil;
      this.activeMenu = null;
    },
    handleSetLocale(iso) {
      this.$root.$i18n.locale = iso;
      Settings.language = iso;
      this.activeMenu = null;
    },
    getLangIcon(iso) {
      return (this.$root.$i18n.locale === iso ? 'check' : '');
    },
    getProfilIcon(profil) {
      return (GlobalStore.selectedProfil === profil ? 'check' : '');
    },
  },
  computed: {
    langList() {
      return [
        { lang: 'english', iso: 'en-EN' },
        { lang: 'french', iso: 'fr-FR' },
      ];
    },
  },
};
</script>

<style lang="scss" src="./Menu.scss">
</style>
