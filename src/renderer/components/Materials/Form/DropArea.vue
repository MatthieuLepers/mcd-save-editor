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
      <span class="icon-import"></span>
    </button>
    <input
      class="m-form-droparea__input"
      tabindex="-1"
      ref="input"
      type="file"
      :value="state.files"
      @input="actions.handleUploadFiles"
    />
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';

defineOptions({ name: 'FormDropArea' });

const { t } = useI18n();
const emit = defineEmits(['fileUpload']);

const input = ref(null);

const props = defineProps({
  modifiers: { type: Object, default: () => ({}) },
});

const state = reactive({
  files: [],
  hover: false,
});

const actions = {
  handleDrop(e) {
    const [...droppedFiles] = e.dataTransfer.files;
    if (!droppedFiles) return;
    emit('fileUpload', droppedFiles);
    state.hover = false;
  },
  handleUploadFiles(e) {
    const [...droppedFiles] = e.target.files;
    if (!droppedFiles) return;
    emit('fileUpload', droppedFiles);
  },
  handleClick() {
    input.value.click();
  },
};
</script>

<style lang="scss" src="./DropArea.scss">
</style>
