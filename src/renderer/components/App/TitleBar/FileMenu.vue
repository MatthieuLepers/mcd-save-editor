<template>
  <ContextMenu :visible="props.visible">
    <ContextMenuItem
      v-if="api.isWeb"
      :label="t('App.TitleBarMenu.fileMenu.open')"
      @click="actions.handleClickOpen"
    />
    <ContextMenuItem
      v-if="api.isWeb"
      :label="t('App.TitleBarMenu.fileMenu.export')"
      @click="actions.handleClickExport"
    />
    <ContextMenuSubMenu
      v-if="!api.isWeb"
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
    <ContextMenuSeparator v-if="!api.isWeb" />
    <ContextMenuItem
      v-if="!api.isWeb"
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

import { api } from '@renderer/core/api';
import { globalStore } from '@renderer/core/stores/GlobalStore';
import { download, openFile, readFile } from '@renderer/core/utils';
import { getLocalStorage, setLocalStorage } from '@renderer/core/Storage';
import Character from '@renderer/core/classes/Character';
import { notificationStore } from '@renderer/components/Materials/Notification/Store';
import Profil from '@/renderer/core/classes/Profil';

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
  async handleClickOpen() {
    const [file] = await openFile();
    const fileContent = await readFile(file);

    try {
      const characterJson = JSON.parse(fileContent);
      const storage = getLocalStorage();
      storage.character = characterJson;
      storage.file = file.name;
      setLocalStorage(storage);

      const profil = new Profil(characterJson.playerId);
      const character = new Character(characterJson, file.name);
      profil.characters.push(character);
      globalStore.state.isDemo = false;
      globalStore.state.profilList = [profil];
      globalStore.setters.setProfil(profil);
    } catch {
      notificationStore.actions.error(t('App.TitleBarMenu.fileMenu.invalidFile'));
    }
  },
  handleClickExport() {
    download(
      globalStore.state.selectedCharacter.filePath,
      JSON.stringify(globalStore.state.selectedCharacter.data, null, 2),
    );
  },
};
</script>
