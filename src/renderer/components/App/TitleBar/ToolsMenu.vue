<template>
  <ContextMenu :visible="props.visible">
    <ContextMenuItem
      :label="t('App.TitleBarMenu.toolsMenu.passwordGenerator')"
      @click="actions.handleClickOpenPasswordGenerator"
    />
    <ContextMenuItem
      :label="t('App.TitleBarMenu.toolsMenu.backupManager')"
      @click="actions.handleClickOpenBackupManager"
    />
  </ContextMenu>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import ContextMenu from '@renderer/components/Materials/ContextMenu/index.vue';
import ContextMenuItem from '@renderer/components/Materials/ContextMenu/Item.vue';

defineOptions({ name: 'AppTitleBarToolsMenu' });

const { t } = useI18n();
const router = useRouter();
const emit = defineEmits(['close']);

const props = defineProps({
  visible: { type: Boolean, required: true },
});

const actions = {
  handleClickOpenPasswordGenerator() {
    api.send('openWindowPasswordGenerator');
    emit('close');
  },
  handleClickOpenBackupManager() {
    emit('close');
    router.push({ name: 'BackupManager' });
  },
};
</script>
