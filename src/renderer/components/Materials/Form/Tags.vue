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
        v-for="(tag, i) in modelValue"
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

const modelValue = defineModel({ type: Array, default: () => [] });

const props = defineProps({
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
  canAdd: (props.max !== null && modelValue.value.length <= props.max) || !props.max,
  canRemove: props.min >= 0 && modelValue.value.length >= props.min,
}));

const actions = {
  handleAddTag() {
    if (state.label.length) {
      const newModelValue = [...modelValue.value, state.label]
        .filter((tag, i, arr) => props.allowDuplicate || arr.indexOf(tag) === i)
      ;
      modelValue.value = newModelValue;
      state.label = '';
    }
  },
  handleRemoveTag(tag) {
    modelValue.value = modelValue.value.filter((t) => t !== tag);
  },
};
</script>

<style lang="scss" src="./Tags.scss">
</style>
