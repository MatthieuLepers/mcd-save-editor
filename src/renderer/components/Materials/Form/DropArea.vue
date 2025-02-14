<template>
  <div class="m-form-droparea">
    <button
      :class="GenerateModifiers('m-form-droparea__button', props.modifiers)"
      @drop.prevent="actions.handleDrop"
      @dragover.prevent
      @click="actions.handleClick"
      @dragenter.prevent="state.hover = true"
      @dragleave="state.hover = false"
    >
      {{ t('Materials.Form.DropArea.areaLabel') }}<br />
      <span class="icon-import" />
    </button>
    <input
      class="m-form-droparea__input"
      tabindex="-1"
      ref="input"
      type="file"
      @input="actions.handleUploadFiles"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import type { IEmits, IProps, IState } from './DropArea';

defineOptions({ name: 'FormDropArea' });

const { t } = useI18n();
const emit = defineEmits<IEmits>();

const input = ref<HTMLInputElement | null>(null);

const props = withDefaults(defineProps<IProps>(), {
  modifiers: () => ({}),
});

const state = reactive<IState>({
  hover: false,
});

const actions = {
  handleDrop(e: DragEvent) {
    const [...droppedFiles] = e.dataTransfer?.files ?? [];
    if (!droppedFiles) return;
    emit('fileUpload', droppedFiles);
    state.hover = false;
  },
  handleUploadFiles(e: Event) {
    const [...droppedFiles] = (e.target as HTMLInputElement)?.files ?? [];
    if (!droppedFiles) return;
    emit('fileUpload', droppedFiles);
  },
  handleClick() {
    input.value?.click();
  },
};
</script>

<style lang="scss" src="./DropArea.scss">
</style>
