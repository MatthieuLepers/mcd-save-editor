<template>
  <div class="MCDExportButton">
    <MCDButton class="MCDButtonExport" icon="export" :title="$t('MCD.ExportButton.label')" size="xs" @click="exportItem" />
  </div>
</template>

<script>
import os from 'os';

import Item from '@/assets/js/classes/Item';
import SaveFileDialog from '@/assets/js/electron/SaveFileDialog';

import MCDButton from './Button';

export default {
  name: 'MCDExportButton',
  components: { MCDButton },
  props: {
    item: { type: Item, required: true },
  },
  methods: {
    exportItem() {
      const sfd = new SaveFileDialog({
        title: this.$t('Electron.SaveFileDialog.title'),
        buttonLabel: this.$t('Electron.SaveFileDialog.buttonLabel'),
        filters: [
          { name: this.$t('Electron.SaveFileDialog.filters.json'), extensions: ['json'] },
        ],
        defaultPath: `${os.homedir()}/Desktop/${this.$t(`MCD.Game.Items.${this.item.$data.type}`)}.json`,
      });
      sfd.saveFile(JSON.stringify(this.item.$data, null, 2));
    },
  },
};
</script>

<style lang="scss" src="./ExportButton.scss">
</style>
