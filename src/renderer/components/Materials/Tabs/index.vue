<template>
  <div :class="GenerateModifiers('m-tabs', props.modifiers)">
    <nav
      class="m-tabs__navigation"
      ref="tabsNav"
      @wheel="actions.handleMouseWheel"
    >
      <Draggable
        :list="[...State.tabs]"
        :move="props.allowMoveFn"
        class="m-tabs__navigation-list"
        itemKey="id"
        tag="ul"
        @change="actions.handleTabMoved"
      >
        <template v-slot:item="{ element }">
          <li
            :data-tab="element.label"
            :class="GenerateModifiers('m-tabs__navigation-list__item', { current: element.$key === props.modelValue })"
          >
            <button
              type="button"
              class="m-tabs__navigation-button"
              @click="emit('update:modelValue', element.$key)"
            >
              <slot :name="`${element.$key}Nav`" :obj="element">
                {{ element.label }}
              </slot>
            </button>
          </li>
        </template>
        <template v-slot:footer>
          <button
            v-if="props.allowAdd"
            type="button"
            class="m-tabs__navigation-list__add"
            @click="emit('newTab')"
          >
            <span class="icon-plus" />
          </button>
        </template>
      </Draggable>
    </nav>
    <div class="m-tabs__container">
      <slot :name="props.modelValue" :obj="State.currentTab" />
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, ref } from 'vue';
import Draggable from 'vuedraggable';

defineOptions({ name: 'Tabs' });

const emit = defineEmits(['update:modelValue', 'orderChange', 'newTab']);

const tabsNav = ref(null);

const props = defineProps({
  modelValue: { type: String },
  tabs: { type: Object, default: () => ({}) },
  modifiers: { type: Object, default: () => ({}) },
  allowAdd: { type: Boolean, default: false },
  allowMoveFn: { type: Function, default: () => true },
});

const state = reactive({
  index: 0,
});

const State = computed(() => ({
  tabs: Object
    .keys(props.tabs)
    .map((tabKey) => {
      const tab = props.tabs[tabKey];
      tab.$key = tabKey;
      return tab;
    })
    .slice(state.index),
}));

const actions = {
  handleMouseWheel(e) {
    const delta = e.deltaY > 0 ? 1 : -1;
    state.index = Math.max(0, Math.min(Object.keys(props.tabs).length - 1, state.index + delta));
  },
  handleTabMoved(e) {
    const { newIndex, oldIndex } = e.moved;
    const tabs = Object.values(props.tabs);
    emit('orderChange', {
      tab: tabs[newIndex],
      order: oldIndex,
    }, {
      tab: tabs[oldIndex],
      order: newIndex,
    });
  },
};
</script>

<style lang="scss" src="./index.scss">
</style>
