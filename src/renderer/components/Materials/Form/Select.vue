<template>
  <div
    ref="root"
    :id="props.id || `formSelect${$uid}`"
    :class="GenerateModifiers('m-form-select', {
      valid: props.valid !== null && props.valid,
      invalid: props.valid !== null && !props.valid,
      [props.variant]: true,
      focus: state.focused || state.open,
      empty: !State.selectedOptionList.length || (props.searchable && state.focused),
      required: props.required,
      disabled: props.disabled,
      open: state.open,
      multiple: State.isMultiple,
    })"
    @keydown="actions.handleContainerKeydown"
  >
    <select
      v-if="State.isGroupable"
      class="m-form-select__original"
      :name="name"
      :id="props.id || `formSelect${$uid}`"
      :multiple="State.isMultiple"
      :required="props.required"
      :disabled="props.disabled"
      @focus="actions.handleFocus(true, true)"
      @blur="actions.handleFocus(false, false)"
    >
      <optgroup
        v-for="group in Object.keys(State.groupedOptions)"
        :key="group"
        :label="group"
      >
        <option
          v-for="(option, i) in State.groupedOptions[group]"
          :key="i"
          :value="option.value"
          :selected="state.selectedOptions.includes(option.value)"
        >
          {{ option.label }}
        </option>
      </optgroup>
    </select>
    <select
      v-else
      class="m-form-select__original"
      :name="props.name"
      :id="props.id || `formSelect${$uid}`"
      :multiple="State.isMultiple"
      :required="props.required"
      :disabled="props.disabled"
      @focus="actions.handleFocus(true, true)"
      @blur="actions.handleFocus(false, false)"
    >
      <option
        v-for="(option, i) in State.filteredOptions"
        :key="i"
        :value="option.value"
        :selected="state.selectedOptions.includes(option.value)"
      >
        {{ option.label }}
      </option>
    </select>

    <div class="m-form-select__container">
      <label
        v-if="props.label"
        :for="props.id || `formSelect${$uid}`"
        class="m-form-select__label"
      >
        {{ props.label }} <strong v-if="State.isMultiple && !!State.selectedOptionList.length">({{ State.selectedOptionList.length }})</strong>
      </label>
      <div
        :class="GenerateModifiers('m-form-select__outer', { focus: state.focused || state.open })"
        @click="actions.handleClickOpen"
      >
        <div class="m-form-select__outer__item-list">
          <component
            v-for="(option, i) in State.selectedOptionList"
            :key="i"
            :is="props.allowRemoveSelected && !props.disabled ? 'button' : 'span'"
            :class="GenerateModifiers('m-form-select__outer__item', { removable: props.allowRemoveSelected && !props.disabled })"
            type="button"
            @click.stop="actions.handleSelectOption(option.value)"
          >
            <slot name="selectedOption" :option="option">
              {{ option.label }}
            </slot>
            <span
              v-if="props.allowRemoveSelected && !props.disabled"
              class="m-form-select__outer__item-icon icon-close"
              aria-hidden="true"
            ></span>
          </component>
          <input
            v-if="props.searchable"
            v-model="state.searchText"
            class="m-form-select__input"
            type="text"
            ref="input"
            :placeholder="props.inputPlaceholder"
            :disabled="props.disabled"
            @contextmenu.stop="actions.handleClickReset"
            @focus="actions.handleFocus(true, true)"
            @click.prevent.stop
            @keydown.stop
            @keydown.enter.prevent.stop="actions.handleInputEnter"
          />
        </div>
        <span class="m-form-select__outer-arrow" aria-hidden="true"></span>
      </div>

      <div
        v-if="State.isGroupable"
        :class="GenerateModifiers('m-form-select__dropdown', {
          [props.dropdownPosition]: true,
          overflowing: state.isOverflowing,
        })"
        ref="dropdown"
      >
        <div
          v-for="group in Object.keys(State.groupedOptions)"
          :key="group"
          class="m-form-select__dropdown__group"
        >
          <div class="m-form-select__dropdown__group-label">
            <slot name="optgroup" :group="group">
              {{ group }}
            </slot>
          </div>
          <component
            v-for="(option, i) in State.groupedOptions[group]"
            :key="i"
            :is="props.allowRemoveSelected && !props.disabled ? 'button' : 'div'"
            :class="GenerateModifiers('m-form-select__dropdown__item', {
              selected: state.selectedOptions.includes(option.value),
              focused: i === state.fakeIndex,
              removable: state.selectedOptions.includes(option.value) && props.allowRemoveSelected && !props.disabled,
            })"
            :aria-label="props.allowRemoveSelected && !props.disabled ? `Retirer l'option ${option.label}` : null"
            type="button"
            @click="actions.handleSelectOption(option.value)"
          >
            <slot name="option" :option="option">
              {{ option.label }}
            </slot>
            <span
              v-if="state.selectedOptions.includes(option.value) && props.allowRemoveSelected && !props.disabled"
              class="m-form-select__dropdown__item-icon icon-close"
              aria-hidden="true"
            ></span>
          </component>
        </div>
        <span
          v-if="props.searchable && !State.filteredOptions.length"
          :class="GenerateModifiers('m-form-select__dropdown__item', { empty: true })"
        >
          <slot
            name="empty"
            :search="state.searchText"
            :reset="actions.handleClickReset"
          >
            Aucun résultat pour « {{ state.searchText }} »
          </slot>
        </span>
      </div>
      <div
        v-else
        :class="GenerateModifiers('m-form-select__dropdown', {
          [props.dropdownPosition]: true,
          overflowing: state.isOverflowing,
        })"
        ref="dropdown"
      >
        <button
          v-for="(option, i) in State.filteredOptions"
          :key="i"
          :class="GenerateModifiers('m-form-select__dropdown__item', {
            selected: state.selectedOptions.includes(option.value),
            focused: i === state.fakeIndex,
            removable: state.selectedOptions.includes(option.value) && props.allowRemoveSelected && !props.disabled,
          })"
          :aria-label="props.allowRemoveSelected && !props.disabled ? `Retirer l'option ${option.label}` : null"
          type="button"
          @click="actions.handleSelectOption(option.value)"
        >
          <slot name="option" :option="option">
            {{ option.label }}
          </slot>
          <span
            v-if="state.selectedOptions.includes(option.value) && props.allowRemoveSelected && !props.disabled"
            class="m-form-select__dropdown__item-icon icon-close"
            aria-hidden="true"
          ></span>
        </button>
        <span
          v-if="props.searchable && !State.filteredOptions.length"
          :class="GenerateModifiers('m-form-select__dropdown__item', { empty: true })"
        >
          <slot
            name="empty"
            :search="state.searchText"
            :reset="actions.handleClickReset"
          >
            {{ t('App.Materials.Form.Select.emptyResult', [state.searchText]) }}
          </slot>
        </span>
      </div>
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
  watch,
  ref,
  getCurrentInstance,
} from 'vue';
import { useI18n } from 'vue-i18n';

import MaterialFormMessageList from '@renderer/components/Materials/Form/MessageList.vue';

defineOptions({ name: 'FormSelect' });

const { t } = useI18n();
const emit = defineEmits(['update:modelValue', 'keydown-enter', 'search', 'optionRemoved', 'optionAdded']);
const $uid = getCurrentInstance().uid;

const root = ref(null);
const input = ref(null);
const dropdown = ref(null);

const props = defineProps({
  modelValue: { type: [Array, String, Number, Boolean] },
  id: { type: String, default: null },
  required: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  variant: { type: String, default: 'default' },
  valid: { type: Boolean, default: null },
  messages: { type: Array, default: () => [] },
  name: { type: String, default: null },
  label: { type: String, default: null },
  options: { type: Array, default: () => [] },
  searchable: { type: Boolean, default: false },
  inputPlaceholder: { type: String, default: null },
  dropdownPosition: { type: String, default: 'bottom' },
  allowRemoveSelected: { type: Boolean, default: false },
});

const state = reactive({
  selectedOptions: Array.isArray(props.modelValue) ? props.modelValue : [props.modelValue],
  focused: false,
  open: false,
  isOverflowing: false,
  fakeIndex: 0,
  touched: false,
  searchText: '',
});

const State = computed(() => {
  const filteredOptions = !state.searchText.length
    ? props.options
    : props.options.filter((option) => option.label.toLowerCase().includes(state.searchText.toLowerCase()))
  ;
  const groupedOptions = filteredOptions.reduce((acc, option) => ({
    ...acc,
    [option.group]: [
      ...(acc[option.group] ?? []),
      option,
    ],
  }), {});
  const isGroupable = !!props.options.length && props.options.every((option) => !!option.group);
  const selectedOptionList = props.options.filter((option) => state.selectedOptions.includes(option.value));
  const isMultiple = Array.isArray(props.modelValue);

  return {
    filteredOptions,
    groupedOptions,
    isGroupable,
    selectedOptionList,
    isMultiple,
  };
});

const actions = {
  handleClickReset() {
    state.searchText = '';
  },
  handleClickOpen() {
    if (!props.disabled) {
      state.open = !state.open;
      state.touched = true;
      if (props.searchable) {
        input.value.focus();
      }
    }
  },
  handleInputEnter() {
    emit('keydown-enter', state.searchText, actions.handleClickReset);
  },
  handleContainerKeydown(e) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      e.stopPropagation();
      state.fakeIndex = Math.min(props.options.length - 1, state.fakeIndex + 1);
      dropdown.value.children[state.fakeIndex].scrollIntoView();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      e.stopPropagation();
      state.fakeIndex = Math.max(0, state.fakeIndex - 1);
      dropdown.value.children[state.fakeIndex].scrollIntoView();
    } else if (e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
      actions.handleSelectOption(props.options[state.fakeIndex].value);
    }
  },
  handleSelectOption(optionValue) {
    if (state.selectedOptions.includes(optionValue)) {
      if (props.allowRemoveSelected) {
        state.selectedOptions = state.selectedOptions.filter((val) => val !== optionValue);
        emit('optionRemoved', optionValue);
      }
    } else {
      state.selectedOptions.push(optionValue);
      emit('optionAdded', optionValue);
    }
    state.open = false;

    emit('update:modelValue', State.value.isMultiple ? state.selectedOptions : optionValue);
  },
  handleFocus(focused, open) {
    if (!state.touched) {
      state.touched = true;
    }
    state.focused = focused;
    state.open = open;
    if (props.searchable && state.focused) {
      input.value.focus();
    }
  },
};

watch(() => props.modelValue, (newVal) => {
  state.selectedOptions = Array.isArray(newVal) ? newVal : [newVal];
});

watch(() => state.open, () => {
  state.isOverflowing = dropdown.value.scrollHeight > dropdown.value.offsetHeight;
});

const handleWindowClick = (e) => {
  if (e.target.matches('.m-form-select') || e.target.closest('.m-form-select')) {
    const target = e.target.closest('.m-form-select') || e.target;
    if (target?.id !== root.value?.id) {
      actions.handleFocus(false, false);
    }
  } else {
    actions.handleFocus(false, false);
  }
};

watch(() => state.open, (newVal) => {
  if (newVal) {
    window.addEventListener('click', handleWindowClick);
  } else {
    window.removeEventListener('click', handleWindowClick);
  }
});

watch(() => state.searchText, (newVal) => {
  emit('search', newVal);
});
</script>

<style lang="scss" src="./Select.scss">
</style>
