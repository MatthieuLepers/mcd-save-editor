<template>
  <div
    ref="root"
    :class="GenerateModifiers('m-modal__backdrop', {
      visible: State.backDropVisible,
      open: state.open,
      topMost: state.open && State.backDropVisible,
    })"
  >
    <div
      :id="props.name"
      :class="GenerateModifiers('m-modal', {
        ...props.modifiers,
        noFooter: !props.showFooter,
      })"
    >
      <div class="m-modal__header">
        <slot name="header" :title="props.title">
          {{ props.title }}
        </slot>
      </div>
      <div class="m-modal__body">
        <slot />
      </div>
      <div
        v-if="props.showFooter"
        class="m-modal__footer"
      >
        <slot
          name="footer"
          :accept="actions.handleAccept"
          :refuse="actions.handleRefuse"
          :close="actions.handleClose"
        >
          <MaterialButton
            v-if="!props.acceptOnly"
            type="button"
            :class="GenerateModifiers('m-modal__btn', { refuse: true })"
            :modifiers="{ danger: true }"
            @click="actions.handleRefuse"
          >
            {{ props.refuseLabel }}
          </MaterialButton>
          <MaterialButton
            v-if="!props.refuseOnly"
            type="button"
            :class="GenerateModifiers('m-modal__btn', { accept: true })"
            :modifiers="{ secondary: true }"
            @click="actions.handleAccept"
          >
            {{ props.acceptLabel }}
          </MaterialButton>
        </slot>
      </div>
      <slot
        v-if="props.showClose"
        :close="actions.handleClose"
        name="close"
      >
        <button
          type="button"
          :class="GenerateModifiers('m-modal__btn', { close: true })"
          @click="actions.handleClose"
        >
        </button>
      </slot>
    </div>
  </div>
</template>

<script setup>
import {
  reactive,
  computed,
  watch,
  ref,
  onMounted,
  onUnmounted,
} from 'vue';

import MaterialButton from '@renderer/components/Materials/Button/index.vue';

import { modalStore } from '@renderer/components/Materials/Modal/Store';

defineOptions({ name: 'Modal' });

const emit = defineEmits(['open', 'close', 'accept', 'refuse']);

const root = ref(null);

const props = defineProps({
  name: { type: String, required: true },
  title: { type: String, default: null },
  showClose: { type: Boolean, default: true },
  showFooter: { type: Boolean, default: true },
  acceptOnly: { type: Boolean, default: false },
  refuseOnly: { type: Boolean, default: false },
  acceptLabel: { type: String, default: 'Ok' },
  refuseLabel: { type: String, default: 'Cancel' },
  /**
   * Valid modifiers:
   * - Modal : paddingLess, rounded
   * - Body  : centered
   * - Size  : xs
   */
  modifiers: { type: Object, default: () => ({}) },
});

const state = reactive({
  open: false,
  oldFocusElement: null,
});

const State = computed(() => ({
  backDropVisible: modalStore.actions.isLastOpen(props.name),
}));

const actions = {
  handleClose() {
    if (state.open) {
      modalStore.actions.hide(props.name);
      state.oldFocusElement.focus();
      emit('close');
    }
  },
  handleAccept() {
    emit('accept');
    actions.handleClose();
  },
  handleRefuse() {
    emit('refuse');
    actions.handleClose();
    state.oldFocusElement.focus();
  },
};

const handleClickBackdrop = (e) => {
  if (e.target === root.value) modalStore.actions.hide(props.name);
};

watch(() => state.open, (newVal) => {
  if (newVal) {
    emit('open');
    state.oldFocusElement = document.activeElement;
    root.value.querySelector('input, select, textarea, area, button, a, [tabindex]').focus();
  } else {
    actions.handleClose();
  }
});

const modalObj = { name: props.name, state };
onMounted(() => {
  modalStore.actions.register(modalObj);
  window.addEventListener('mouseup', handleClickBackdrop);
  window.addEventListener('touchend', handleClickBackdrop);
});

onUnmounted(() => {
  modalStore.actions.unregister(modalObj);
  window.removeEventListener('mouseup', handleClickBackdrop);
  window.removeEventListener('touchend', handleClickBackdrop);
});
</script>

<style lang="scss" src="./index.scss">
</style>
