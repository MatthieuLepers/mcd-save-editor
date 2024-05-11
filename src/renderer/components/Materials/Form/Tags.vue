<template>
  <div class="m-form-tags__container">
    <label
      v-if="props.label"
      class="m-form-tags__label"
    >
      {{ props.label }}
    </label>
    <ul class="m-form-tags">
      <li
        v-for="(tag, i) in props.modelValue"
        :key="i"
        class="m-form-tags__item"
      >
        {{ tag }}
        <button
          v-if="props.allowRemove && State.canRemove"
          type="button"
          class="m-form-tags__remove"
          @click="actions.handleRemoveTag(tag)"
        >
          <span v-icon:close />
        </button>
      </li>
      <li
        v-if="props.allowAdd && State.canAdd"
        class="m-form-tags__add"
      >
        <MaterialFormInput
          v-model="state.label"
          :placeholder="props.addPlaceholder"
          :iconData="{
            clickable: true,
            icon: 'icon-plus',
            ariaLabel: 'Add',
          }"
          name="tagLabel"
          @keydown.enter.stop="actions.handleAddTag"
          @icon="actions.handleAddTag"
        />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue';

import MaterialFormInput from '@renderer/components/Materials/Form/Input.vue';

defineOptions({ name: 'FormTags' });

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
  modelValue: { type: Array, default: () => [] },
  label: { type: String, default: null },
  allowRemove: { type: Boolean, default: true },
  allowAdd: { type: Boolean, default: true },
  allowDuplicate: { type: Boolean, default: false },
  min: { type: Number, default: 0 },
  max: { type: Number, default: null },
  addPlaceholder: { type: String, default: null },
});

const state = reactive({
  label: '',
});

const State = computed(() => ({
  canAdd: (props.max !== null && props.modelValue.length <= props.max) || !props.max,
  canRemove: props.min >= 0 && props.modelValue.length >= props.min,
}));

const actions = {
  handleAddTag() {
    if (state.label.length) {
      const newModelValue = [...props.modelValue, state.label]
        .filter((tag, i, arr) => props.allowDuplicate || arr.indexOf(tag) === i)
      ;
      emit('update:modelValue', newModelValue);
      state.label = '';
    }
  },
  handleRemoveTag(tag) {
    emit('update:modelValue', props.modelValue.filter((t) => t !== tag));
  },
};
</script>

<style lang="scss" src="./Tags.scss">
</style>
