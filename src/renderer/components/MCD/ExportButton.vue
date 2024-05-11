<template>
  <div class="MCDExportButton">
    <MCDButton
      class="MCDButtonExport"
      icon="export"
      :title="t('MCD.ExportButton.label')"
      size="xs"
      @click="actions.exportItem"
    />
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

import MCDButton from '@renderer/components/MCD/Button.vue';

import Item from '@renderer/core/classes/Item';

defineOptions({ name: 'MCDExportButton' });

const { t } = useI18n();

const props = defineProps({
  item: { type: Item, required: true },
});

const actions = {
  async exportItem() {
    const dialogOptions = {
      title: t('Electron.dialogs.saveFile.title'),
      buttonLabel: t('Electron.dialogs.saveFile.button'),
      defaultPath: `${api.homedir}/Desktop/${t(`MCD.Game.Items.${props.item.data.type}`)}.json`,
      filters: [
        {
          name: t('Electron.dialogs.filters.json'),
          extensions: ['json'],
        },
      ],
      properties: [],
    };

    await api.invoke('exportItem', dialogOptions, JSON.stringify(props.item.data, null, 2));
  },
};
</script>

<style lang="scss" src="./ExportButton.scss">
</style>
