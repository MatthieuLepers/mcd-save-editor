<template>
  <div :class="GenerateModifiers('m-form-toggle', {
    focus: state.focused,
    disabled: props.disabled,
    [props.variant]: props.variant,
    [props.direction]: props.direction,
  })">
    <input
      type="checkbox"
      :id="props.id || `formToggle${$uid}`"
      :checked="modelValue"
      :name="props.name"
      :disabled="props.disabled"
      @input="modelValue = $event.target.checked"
      @focus="actions.handleFocus('focus', true)"
      @blur="actions.handleFocus('blur', false)"
    />
    <label class="m-form-toggle__label" :for="props.id || `formToggle${$uid}`">
      <slot>{{ props.label }}</slot>
    </label>
  </div>
</template>

<script setup>
import { reactive, getCurrentInstance } from 'vue';

defineOptions({ name: 'FormToggle' });

const emit = defineEmits(['focus', 'blur']);
const $uid = getCurrentInstance().uid;

const modelValue = defineModel({ type: Boolean, default: false });

/**
 * slots:
 * - default : label
 */
const props = defineProps({
  id: { type: String, default: null },
  name: { type: String, default: null },
  label: { type: String, required: true },
  disabled: { type: Boolean, default: false },
  variant: { type: String, default: 'default' },
  direction: { type: String, default: 'left' },
});

const state = reactive({
  focused: false,
});

const actions = {
  handleFocus(type, value) {
    state.focused = value;
    emit(type, state.focused);
  },
};
</script>

<style lang="scss" src="./Toggle.scss">
</style>
