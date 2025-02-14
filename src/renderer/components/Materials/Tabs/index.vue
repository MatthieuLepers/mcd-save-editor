<template>
  <div :class="GenerateModifiers('m-tabs', props.modifiers)">
    <nav
      class="m-tabs__navigation"
      @wheel="actions.handleMouseWheel"
    >
      <VueDraggableNext
        v-model="tabs"
        :move="props.allowMoveFn"
        class="m-tabs__navigation-list"
        tag="ul"
        @change="actions.handleChangeOrder"
      >
        <li
          v-for="(tab, i) in tabs"
          :key="tab.id"
          :data-tab="tab.label"
          :class="GenerateModifiers('m-tabs__navigation-list__item', {
            current: tab.id === modelValue,
            hidden: state.offset > i,
          })"
        >
          <button
            type="button"
            class="m-tabs__navigation-button"
            @click="modelValue = tab.id"
          >
            <slot :name="`${tab.id}Nav`" :tab="tab">
              {{ tab.label }}
            </slot>
          </button>
        </li>
        <li
          v-if="props.allowAdd"
          class="m-tabs__navigation-list__item"
        >
          <button
            type="button"
            class="m-tabs__navigation-list__add"
            @click="emit('newTab')"
          >
            <span class="icon-plus" />
          </button>
        </li>
      </VueDraggableNext>
    </nav>
    <div class="m-tabs__container">
      <slot :name="State.currentTab.id" :tab="State.currentTab!" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue';
import { VueDraggableNext } from 'vue-draggable-next';

import type {
  ISlots,
  IProps,
  IState,
  ITab,
} from '.';

defineOptions({ name: 'Tabs' });

defineSlots<ISlots>();

const emit = defineEmits<{
  newTab: [];
}>();

const modelValue = defineModel<string | number, string>();
const tabs = defineModel<Array<ITab>>('tabs', { default: () => [] });

const props = withDefaults(defineProps<IProps>(), {
  allowAdd: false,
  allowMoveFn: () => true,
  modifiers: () => ({}),
});

const state = reactive<IState>({
  offset: 0,
});

const State = computed(() => ({
  currentTab: tabs.value.find(({ id }) => modelValue.value === id),
}));

const actions = {
  handleMouseWheel(e: WheelEvent) {
    const delta = e.deltaY > 0 ? 1 : -1;
    state.offset = Math.max(0, Math.min(tabs.value.length - 1, state.offset + delta));
  },
  handleChangeOrder() {
    tabs.value.forEach((tab, i) => {
      tab.order = i;
    });
  },
};
</script>

<style lang="scss" src="./index.scss">
</style>
