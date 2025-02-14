<template>
  <div class="MCDImportButton">
    <MCDButton
      class="MCDButtonImport"
      icon="import"
      :title="t('MCD.ImportButton.label')"
      size="xs"
      @click="actions.importItem"
    />

    <MaterialModal
      name="ImportConfirmModal"
      :title="t('MCD.ImportButton.modal.confirm.title')"
      :acceptLabel="t('MCD.ImportButton.modal.confirm.okLabel')"
      :refuseLabel="t('MCD.ImportButton.modal.confirm.cancelLabel')"
      @accept="actions.handleModalConfirm"
    >
      <div class="ImportedItemDetails">
        <MCDItem :item="state.importedItem" :noDragEvent="true" v-if="state.importedItem" />
        <div class="ImportedItemDetailsInfos">
          <p>{{ t('MCD.ImportButton.modal.confirm.content1') }}</p>
          <p>{{ t('MCD.ImportButton.modal.confirm.content2') }}</p>
        </div>
      </div>
    </MaterialModal>

    <MaterialModal
      name="ImportErrorModal"
      :title="t('MCD.ImportButton.modal.error.title')"
      :refuseOnly="true"
      :refuseLabel="t('MCD.ImportButton.modal.error.cancelLabel')"
    >
      <p>{{ t('MCD.ImportButton.modal.error.content') }}</p>
    </MaterialModal>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';

import MaterialModal from '@renderer/components/Materials/Modal/index.vue';
import MCDButton from '@renderer/components/MCD/Button.vue';
import MCDItem from '@renderer/components/MCD/Item.vue';

import GameItem from '@renderer/core/entities/item/game';
import ItemValidator from '@renderer/core/validators/ItemValidator';
import { globalStore } from '@renderer/core/stores/GlobalStore';
import { modalStore } from '@renderer/components/Materials/Modal/Store';
import { api } from '@renderer/core/api';

defineOptions({ name: 'MCDImportButton' });

const { t } = useI18n();

const state = reactive({
  importedItem: null,
});

const actions = {
  async importItem() {
    const dialogOptions = {
      title: t('Electron.dialogs.openFile.title'),
      buttonLabel: t('Electron.dialogs.openFile.button'),
      defaultPath: `${api.homedir}/Desktop`,
      filters: [
        {
          name: t('Electron.dialogs.filters.json'),
          extensions: ['json'],
        },
      ],
      properties: ['openFile'],
    };

    const fileContentRaw = await api.invoke('importItem', dialogOptions);

    if (fileContentRaw) {
      try {
        const fileData = JSON.parse(fileContentRaw);
        const validator = new ItemValidator(fileData);

        if (validator.isValid()) {
          state.importedItem = new GameItem(fileData);
          modalStore.actions.show('ImportConfirmModal');
        } else {
          modalStore.actions.show('ImportErrorModal');
        }
      } catch (e) {
        modalStore.actions.show('ImportErrorModal');
      }
    }
  },
  handleModalConfirm() {
    globalStore.state.selectedCharacter.inventory.addItem(state.importedItem);
    state.importedItem = null;
    modalStore.actions.hide('ConfirmImportModal');
  },
};
</script>

<style lang="scss" src="./ImportButton.scss">
</style>
