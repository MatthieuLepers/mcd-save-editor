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

<script setup lang="ts">
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
import { IProps, ISlots, IState } from '.';

defineOptions({ name: 'Modal' });

defineSlots<ISlots>();

const emit = defineEmits<{
  open: [];
  close: [];
  accept: [];
  refuse: [];
}>();

const root = ref<HTMLDivElement | null>(null);

const props = withDefaults(defineProps<IProps>(), {
  showClose: true,
  showFooter: true,
  acceptOnly: false,
  refuseOnly: false,
  acceptLabel: 'Ok',
  refuseLabel: 'Cancel',
  modifiers: () => ({}),
});

const state = reactive<IState>({
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
      state.oldFocusElement?.focus();
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
    state.oldFocusElement?.focus();
  },
};

const handleClickBackdrop = (e: MouseEvent | TouchEvent) => {
  if (e.target === root.value) {
    actions.handleClose();
  }
};

watch(() => state.open, (open) => {
  if (open) {
    emit('open');
    state.oldFocusElement = document.activeElement as HTMLElement;
    root.value?.querySelector<HTMLElement>('input, select, textarea, area, button, a, [tabindex]')?.focus();
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
