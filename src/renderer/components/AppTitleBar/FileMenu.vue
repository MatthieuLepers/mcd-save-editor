<template>
  <ContextMenu :visible="props.visible">
    <ContextMenuSubMenu
      :label="t('App.TitleBarMenu.fileMenu.selectProfil')"
      @over="state.activeSubMenu = 'selectProfil'"
      @out="state.activeSubMenu = null"
    >
      <ContextMenu
        :visible="state.activeSubMenu === 'selectProfil'"
        anchor="top right"
      >
        <ContextMenuItem
          v-for="(profil, i) in globalStore.state.profilList"
          :key="i"
          :label="profil.id"
          :icon="actions.getProfilIcon(profil)"
          @click="actions.handleClickedProfil(profil)"
        />
      </ContextMenu>
    </ContextMenuSubMenu>
    <ContextMenuSeparator />
    <ContextMenuItem
      :label="t('App.TitleBarMenu.fileMenu.exit')"
      :shortcut="plateform === 'darwin' ? 'Cmd+Q' : 'Alt+F4'"
      @click="actions.closeApp"
    />
  </ContextMenu>
</template>

<script setup>
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';

import ContextMenu from '@renderer/components/Materials/ContextMenu/index.vue';
import ContextMenuSubMenu from '@renderer/components/Materials/ContextMenu/SubMenu.vue';
import ContextMenuItem from '@renderer/components/Materials/ContextMenu/Item.vue';
import ContextMenuSeparator from '@renderer/components/Materials/ContextMenu/Separator.vue';

import { globalStore } from '@renderer/core/stores/GlobalStore';

defineOptions({ name: 'AppTitleBarFileMenu' });

const { t } = useI18n();
const { plateform } = api;

const props = defineProps({
  visible: { type: Boolean, required: true },
  name: { type: String, required: true },
});

const state = reactive({
  activeSubMenu: null,
});

const actions = {
  closeApp() {
    api.send(`close:${props.name}`);
  },
  handleClickedProfil(profil) {
    globalStore.setters.setProfil(profil);
  },
  getProfilIcon(profil) {
    return (globalStore.state.selectedProfil === profil ? 'icon-check' : '');
  },
};
</script>
