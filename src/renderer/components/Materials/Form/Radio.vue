<template>
  <div :class="GenerateModifiers('m-form-radio', { focus: state.focused })">
    <input
      type="radio"
      :id="props.id || `formRadio${$uid}`"
      :value="props.value"
      :name="props.name"
      :disabled="props.disabled"
      :checked="modelValue === props.value"
      @click="modelValue = props.value"
      @focus="state.focused = true"
      @blur="state.focused = false"
    />
    <label :for="props.id || `formRadio${$uid}`">
      {{ props.label }}
    </label>
  </div>
</template>

<script setup>
import { reactive, getCurrentInstance } from 'vue';

defineOptions({ name: 'FormRadio' });

const $uid = getCurrentInstance().uid;

const modelValue = defineModel({ type: [String, Number, Boolean] });

const props = defineProps({
  id: { type: String, default: null },
  value: { type: [String, Number, Boolean, null], required: true },
  name: { type: String, default: null },
  label: { type: String, required: true },
  disabled: { type: Boolean, default: false },
});

const state = reactive({
  focused: false,
});
</script>

<style lang="scss" src="./Radio.scss">
</style>
