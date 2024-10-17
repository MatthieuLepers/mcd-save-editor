<template>
  <ContextMenu :visible="props.visible">
    <ContextMenuItem
      v-for="(iso, i) in availableLocales"
      :key="i"
      :label="t(`App.TitleBarMenu.langMenu.${iso}`)"
      :icon="iso === locale ? 'icon-check' : ''"
      @click="actions.handleSetLocale(iso)"
    />
  </ContextMenu>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

import ContextMenu from '@renderer/components/Materials/ContextMenu/index.vue';
import ContextMenuItem from '@renderer/components/Materials/ContextMenu/Item.vue';

defineOptions({ name: 'AppTitleBarLangMenu' });

const { t, locale, availableLocales } = useI18n();
const emit = defineEmits(['update:modelValue', 'close']);

const props = defineProps({
  visible: { type: Boolean, required: true },
});

const actions = {
  handleSetLocale(iso) {
    api.invoke('localeChange', iso);
    locale.value = iso;
    emit('update:modelValue', iso);
    emit('close');
  },
};
</script>
