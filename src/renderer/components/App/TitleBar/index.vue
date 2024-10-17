<template>
  <TitleBar
    :name="props.name"
    :appTitle="props.appTitle"
    :maximizable="false"
    :showHelp="props.showHelp"
    @help="emit('help')"
    @minimize="emit('minimize')"
    @maximize="emit('maximize')"
    @close="emit('close')"
  >
    <template v-slot:menu="{ windowName }">
      <TitleBarMenu :menuList="State.menuList">
        <template #fileMenu="{ visible, close }">
          <AppTitleBarFileMenu :visible="visible" :name="windowName" @close="close" />
        </template>
        <template #langMenu="{ visible, close }">
          <AppTitleBarLangMenu :visible="visible" @close="close" />
        </template>
        <template #toolsMenu="{ visible, close }">
          <AppTitleBarToolsMenu :visible="visible" @close="close" />
        </template>
        <template v-slot:aboutMenu="{ visible, close }">
          <AppTitleBarAboutMenu :visible="visible" @close="close" />
        </template>
      </TitleBarMenu>
    </template>
  </TitleBar>
</template>

<script setup>
import { computed } from 'vue';

import TitleBar from '@renderer/components/Materials/TitleBar/index.vue';
import TitleBarMenu from '@renderer/components/Materials/TitleBar/Menu.vue';
import AppTitleBarFileMenu from '@renderer/components/App/TitleBar/FileMenu.vue';
import AppTitleBarLangMenu from '@renderer/components/App/TitleBar/LangMenu.vue';
import AppTitleBarToolsMenu from '@renderer/components/App/TitleBar/ToolsMenu.vue';
import AppTitleBarAboutMenu from '@renderer/components/App/TitleBar/AboutMenu.vue';

defineOptions({ name: 'AppTitleBar' });

const emit = defineEmits(['help', 'minimize', 'maximize', 'close']);

const props = defineProps({
  name: { type: String, required: true },
  appTitle: { type: String, default: null },
  showHelp: { type: Boolean, default: false },
});

const State = computed(() => ({
  menuList: ['fileMenu', 'langMenu', 'aboutMenu'],
}));
</script>
