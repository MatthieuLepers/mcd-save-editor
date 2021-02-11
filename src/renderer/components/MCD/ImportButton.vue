<template>
  <div class="MCDImportButton">
    <MCDButton class="MCDButtonImport" icon="import" :title="$t('MCD.ImportButton.label')" size="xs" @click="importItem" />

    <Modal
      name="ImportConfirmModal"
      :title="$t('MCD.ImportButton.modal.confirm.title')"
      :okCancel="true"
      :okLabel="$t('MCD.ImportButton.modal.confirm.okLabel')"
      :cancelLabel="$t('MCD.ImportButton.modal.confirm.cancelLabel')"
      size="sm"
      @confirm="handleModalConfirm"
    >
      <div class="ImportedItemDetails">
        <MCDItem :item="importedItem" :noDragEvent="true" v-if="importedItem" />
        <div class="ImportedItemDetailsInfos">
          <p v-for="(line, i) in $t('MCD.ImportButton.modal.confirm.content')" :key="i">
            {{ line }}
          </p>
        </div>
      </div>
    </Modal>

    <Modal
      name="ImportErrorModal"
      :title="$t('MCD.ImportButton.modal.error.title')"
      :cancelOnly="true"
      :cancelLabel="$t('MCD.ImportButton.modal.error.cancelLabel')"
      size="sm"
    >
      <p>{{ $t('MCD.ImportButton.modal.error.content') }}</p>
    </Modal>
  </div>
</template>

<script>
import os from 'os';

import GlobalStore from '@/js/stores/GlobalStore';
import Item from '@/js/classes/Item';
import ItemValidator from '@/js/validators/ItemValidator';
import OpenFileDialog from '@/js/electron/OpenFileDialog';

import MCDButton from './Button';
import MCDItem from './Item';

import Modal from '../Modal/index';
import ModalStore from '../Modal/Store';

export default {
  name: 'MCDImportButton',
  components: { MCDButton, MCDItem, Modal },
  data() {
    return {
      GlobalStore,
      importedItem: null,
    };
  },
  methods: {
    importItem() {
      const ofd = new OpenFileDialog({
        title: this.$t('Electron.OpenFileDialog.title'),
        buttonLabel: this.$t('Electron.OpenFileDialog.buttonLabel'),
        filters: [
          { name: this.$t('Electron.OpenFileDialog.filters.json'), extensions: ['json'] },
        ],
        defaultPath: `${os.homedir()}/Desktop`,
      });
      const fileContentRaw = ofd.openFile();
      if (fileContentRaw) {
        try {
          const fileData = JSON.parse(fileContentRaw);
          const itemValidator = new ItemValidator(fileData);

          if (itemValidator.isValid()) {
            this.importedItem = new Item(fileData);
            ModalStore.showModal('ImportConfirmModal');
          } else {
            ModalStore.showModal('ImportErrorModal');
          }
        } catch (e) {
          ModalStore.showModal('ImportErrorModal');
        }
      }
    },
    handleModalConfirm() {
      GlobalStore.selectedCharacter.inventory.addItem(this.importedItem);
      this.importedItem = null;
      ModalStore.hideModal('ConfirmImportModal');
    },
  },
};
</script>

<style lang="scss" src="./ImportButton.scss">
</style>
