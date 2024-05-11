<template>
  <div :class="GenerateModifiers('m-form-checkbox', { focus: state.focused, [props.variant]: true })">
    <input
      type="checkbox"
      :id="props.id || `formCheckbox${$uid}`"
      :value="props.value"
      :name="props.name"
      :disabled="props.disabled"
      :checked="State.checked"
      @click="actions.handleClick"
      @focus="state.focused = true"
      @blur="state.focused = false"
    />
    <label :for="props.id || `formCheckbox${$uid}`">
      {{ props.label }}
    </label>
  </div>
</template>

<script setup>
import { reactive, computed, getCurrentInstance } from 'vue';

defineOptions({ name: 'FormCheckbox' });

const emit = defineEmits(['update:modelValue', 'click']);
const $uid = getCurrentInstance().uid;

const props = defineProps({
  modelValue: { type: [Array, String, Boolean, Number] },
  id: { type: String, default: null },
  value: { type: [String, Number, Boolean, null], required: true },
  name: { type: String, default: null },
  label: { type: String, required: true },
  disabled: { type: Boolean, default: false },
  /**
   * Variant: default, small
   */
  variant: { type: String, default: 'default' },
});

const state = reactive({
  focused: false,
});

const State = computed(() => {
  const modelValue = Array.isArray(props.modelValue) ? props.modelValue : [props.modelValue];
  const checked = modelValue.includes(props.value);

  return {
    modelValue,
    checked,
  };
});

const actions = {
  cast(value, type) {
    if (type === 'number') {
      return parseFloat(value);
    }
    return value;
  },
  handleClick(e) {
    const { value, checked } = e.target;
    const castedValue = actions.cast(value, typeof props.value);

    if (checked && !State.value.modelValue.includes(castedValue)) {
      emit('update:modelValue', [...State.value.modelValue, castedValue]);
    } else if (!checked && State.value.modelValue.includes(castedValue)) {
      emit('update:modelValue', State.value.modelValue.filter((v) => v !== props.value));
    }
    emit('click', e, { value: castedValue, checked });
  },
};
</script>

<style lang="scss" src="./Checkbox.scss">
</style>
