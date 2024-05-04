<template>
  <ContextMenu :visible="props.visible">
    <ContextMenuItem
      label="Github"
      @click="actions.handleOpenBrowser"
    />
  </ContextMenu>
</template>

<script setup>
import ContextMenu from '@renderer/components/Materials/ContextMenu/index.vue';
import ContextMenuItem from '@renderer/components/Materials/ContextMenu/Item.vue';

defineOptions({ name: 'AppTitleBarAboutMenu' });

const props = defineProps({
  visible: { type: Boolean, required: true },
});

const actions = {
  handleOpenBrowser() {
    api.invoke('openGithubLink', 'https://github.com/MatthieuLepers/mcd-save-editor');
  },
};
</script>
