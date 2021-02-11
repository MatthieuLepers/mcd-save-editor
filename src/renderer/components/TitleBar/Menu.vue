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

      <TitleBarMenuItem id="dlc" :label="$t('TitleBarMenu.dlcMenu.label')" @click="toggleSubMenu('dlc')">
        <ContextMenu :visible="activeMenu === 'dlc'">
          <ContextMenuItem v-for="(dlc, i) in GlobalStore.selectedCharacter.dlcs" :key="i" :label="dlc.id" :icon="dlc.enabled ? 'check' : ''" @click="handleEnableDLC(dlc)" />
        </ContextMenu>
      </TitleBarMenuItem>
    </ul>

    <Modal
      v-if="clickedDlc"
      name="DLCActivationWarningModal"
      :title="$t('TitleBarMenu.dlcMenu.modal.title')"
      :okCancel="true"
      :okLabel="$t('TitleBarMenu.dlcMenu.modal.okLabel')"
      :cancelLabel="$t('TitleBarMenu.dlcMenu.modal.cancelLabel')"
      size="sm"
      @confirm="handleModalConfirm"
      @close="handleModalClose"
    >
      <p v-for="(line, i) in $t('TitleBarMenu.dlcMenu.modal.paragraph', { dlc: clickedDlc.id })" :key="i">
        {{ line }}
      </p>
    </Modal>
  </div>
</template>

<script>
import { remote } from 'electron';

import Settings from '@/js/AppSettings';
import DLCsData from '@/js/data/DLCs';
import GlobalStore from '@/js/stores/GlobalStore';

import ContextMenu from '@/components/ContextMenu/index';
import ContextMenuItem from '@/components/ContextMenu/Item';
import ContextMenuSubMenu from '@/components/ContextMenu/SubMenu';
import ContextMenuSeparator from '@/components/ContextMenu/Separator';

import Modal from '@/components/Modal/index';
import ModalStore from '@/components/Modal/Store';

import TitleBarMenuItem from './MenuItem';

export default {
  name: 'TitleBarMenu',
  components: { TitleBarMenuItem, ContextMenu, ContextMenuItem, ContextMenuSubMenu, ContextMenuSeparator, Modal },
  data() {
    return {
      window: remote.getCurrentWindow(),
      activeMenu: null,
      activeSubMenu: null,
      profilList: GlobalStore.profilList,
      DLCsData,
      GlobalStore,
      clickedDlc: null,
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
    handleEnableDLC(dlc) {
      if (!dlc.enabled) {
        this.clickedDlc = dlc;
        ModalStore.showModal('DLCActivationWarningModal');
      }
    },
    handleModalConfirm() {
      this.clickedDlc.enable();
      ModalStore.hideModal('DLCActivationWarningModal');
    },
    handleModalClose() {
      this.activeMenu = null;
      this.activeSubMenu = null;
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
