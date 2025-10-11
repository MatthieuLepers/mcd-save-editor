<template>
  <ContextMenu :visible="props.visible">
    <ContextMenuItem
      v-if="api.isWeb"
      :label="t('App.TitleBarMenu.fileMenu.open')"
      @click="actions.handleClickOpen"
    />
    <ContextMenuItem
      v-if="api.isWeb && !globalStore.state.isDemo"
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

<script setup lang="ts">
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';

import ContextMenu from '@renderer/components/Materials/ContextMenu/index.vue';
import ContextMenuSubMenu from '@renderer/components/Materials/ContextMenu/SubMenu.vue';
import ContextMenuItem from '@renderer/components/Materials/ContextMenu/Item.vue';
import ContextMenuSeparator from '@renderer/components/Materials/ContextMenu/Separator.vue';

import { api } from '@renderer/core/api';
import { globalStore } from '@renderer/core/stores/GlobalStore';
import {
  download,
  downloadBinary,
  openFile,
  readFile,
} from '@renderer/core/utils';
import { getLocalStorage, setLocalStorage } from '@renderer/core/Storage';
import Character from '@renderer/core/classes/Character';
import { notificationStore } from '@renderer/components/Materials/Notification/Store';
import Profil from '@/renderer/core/classes/Profil';
import { decryptSaveFile, encryptSaveFile, isFileEncrypted } from '@/renderer/core/aesUtils';

defineOptions({ name: 'AppTitleBarFileMenu' });

const { t } = useI18n();
const { plateform } = api;

const props = defineProps<{
  visible: boolean;
  name: string;
}>();

const state = reactive<{
  activeSubMenu: string | null;
}>({
  activeSubMenu: null,
});

const actions = {
  closeApp() {
    api.send(`close:${props.name}`);
  },
  handleClickedProfil(profil: Profil) {
    globalStore.setters.setProfil(profil);
  },
  getProfilIcon(profil: Profil) {
    return (globalStore.state.selectedProfil === profil ? 'icon-check' : '');
  },
  async handleClickOpen() {
    const [file] = await openFile();
    const fileContent = await readFile(file);

    try {
      const isEncrypted = isFileEncrypted(fileContent);
      const decryptedFile = isEncrypted
        ? new TextDecoder().decode(decryptSaveFile(fileContent))
        : new TextDecoder().decode(fileContent)
      ;
      const characterJson = JSON.parse(decryptedFile);
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
      globalStore.state.isEncrypted = isEncrypted;
    } catch {
      notificationStore.actions.error(t('App.TitleBarMenu.fileMenu.invalidFile'));
    }
  },
  handleClickExport() {
    if (!globalStore.state.selectedCharacter) return;

    if (globalStore.state.isEncrypted) {
      const normalizedJson = JSON.stringify(globalStore.state.selectedCharacter.data, null, 2);
      const encryptedData = encryptSaveFile(new TextEncoder().encode(normalizedJson));
      downloadBinary(globalStore.state.selectedCharacter.filePath, encryptedData);
    } else {
      const encryptedData = JSON.stringify(globalStore.state.selectedCharacter.data, null, 2);
      download(globalStore.state.selectedCharacter.filePath, encryptedData);
    }
  },
};
</script>
