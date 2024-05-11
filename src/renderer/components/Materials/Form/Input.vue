<template>
  <div
    :class="GenerateModifiers('m-form-input', {
      valid: props.valid !== null && props.valid,
      invalid: props.valid !== null && !props.valid,
      [variant]: !!props.variant,
      focus: state.focused,
      empty: State.isEmpty,
      required: props.required,
      readonly: props.readonly,
      disabled: props.disabled,
      adornment: props.iconData.icon || props.iconData.text || props.type === 'password',
      noLabel: !props.label || !props.label.length,
    })">
    <div class="m-form-input__container">
      <input
        :id="props.id || `formInput${$uid}`"
        :type="State.type"
        :placeholder="props.placeholder"
        :pattern="props.pattern"
        :required="props.required"
        :readonly="props.readonly"
        :disabled="props.disabled"
        :value="props.modelValue"
        :name="name"
        :autocomplete="autocomplete"
        :min="props.type === 'number' ? props.min : null"
        :max="props.type === 'number' && props.max ? props.max : null"
        :step="props.type === 'number' ? Math.abs(props.step) : null"
        @input="emit('update:modelValue', actions.cast($event.target.value, typeof props.modelValue))"
        @click="emit('click')"
        @keydown="emit('keydown', $event)"
        @focus="actions.handleFocus('focus', true)"
        @blur="actions.handleFocus('blur', false)"
        @mousewheel="actions.handleMouseWheel"
      />
      <label
        v-if="props.label"
        class="m-form-input__label"
        :for="`formInput${$uid}`"
      >
        {{ props.label }}
      </label>
      <component
        v-if="(iconData.icon && type !== 'password') || type === 'password' || iconData.text"
        type="button"
        :is="iconData.clickable || type === 'password' ? 'button' : 'span'"
        :class="[State.icon, GenerateModifiers('m-form-input__adornment', { clickable: iconData.clickable || type === 'password' })]"
        :aria-label="iconData.ariaLabel"
        :aria-hidden="!iconData.clickable || type !== 'password'"
        @click.stop="actions.handleIconClick"
      >
        {{ props.iconData.text || '' }}
      </component>
    </div>

    <MaterialFormMessageList
      :valid="props.valid"
      :touched="state.touched"
      :messages="props.messages"
    />
  </div>
</template>

<script setup>
import {
  reactive,
  computed,
  ref,
  getCurrentInstance,
} from 'vue';

import MaterialFormMessageList from '@renderer/components/Materials/Form/MessageList.vue';

defineOptions({ name: 'FormInput' });

const emit = defineEmits(['update:modelValue', 'click', 'keydown', 'icon', 'focus', 'blur']);
const $uid = ref(getCurrentInstance().uid);

const props = defineProps({
  modelValue: { type: [String, Number] },
  id: { type: String, default: null },
  type: { type: String, default: 'text' },
  required: { type: Boolean, default: false },
  placeholder: { type: String, default: null },
  pattern: { type: String, default: null },
  readonly: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  label: { type: String, default: null },
  iconData: { type: Object, default: () => ({}) },
  variant: { type: String, default: 'default' },
  valid: { type: Boolean, default: null },
  messages: { type: Array, default: () => [] },
  min: { type: Number, default: 0 },
  max: { type: Number },
  step: { type: Number, default: 1 },
  autocomplete: { type: [String, Boolean], default: null },
  name: { type: String, default: null },
});

const state = reactive({
  focused: false,
  passwordVisible: false,
  touched: false,
});

const State = computed(() => ({
  type: (props.type === 'password' && state.passwordVisible && 'text')
    || (props.type === 'password' && 'password')
    || props.type,
  icon: (props.iconData.icon && props.type !== 'password' && props.iconData.icon)
    || (props.type === 'password' && (state.passwordVisible ? 'icon-eye-slash' : 'icon-eye'))
    || props.iconData?.text
    || null,
  isEmpty: typeof props.modelValue === 'string' && !props.modelValue.length && !props.placeholder?.length,
}));

const actions = {
  cast(value, type) {
    if (type === 'number') {
      return parseFloat(value) || props.min || 0;
    }
    return value;
  },
  handleFocus(type, value) {
    if (!state.touched) {
      state.touched = true;
    }
    state.focused = value;
    emit(type, state.focused);
  },
  handleIconClick(e) {
    if (props.type === 'password') {
      state.passwordVisible = !state.passwordVisible;
    }
    emit('icon', e);
  },
  handleMouseWheel(e) {
    if (props.type === 'number' && state.focused) {
      e.preventDefault();
      const offset = e.deltaY < 0 ? 1 : -1;
      const max = Math.max(props.min, props.modelValue + offset);
      emit('update:modelValue', actions.cast(Math.min(props.max || max, max), typeof props.modelValue));
    }
  },
};
</script>

<style lang="scss" src="./Input.scss">
</style>
