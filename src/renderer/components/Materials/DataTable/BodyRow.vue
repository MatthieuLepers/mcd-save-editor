<template>
  <DataTableRow
    class="m-datatable-bodyrow"
    :modifiers="{ selectable: props.showSelectionRow, selected: props.obj.selected }"
    @click="actions.handleRowClick"
    @contextmenu="emit('contextmenu', $event, props.obj)"
  >
    <div class="m-datatable-bodyrow__container">
      <DataTableRow
        v-if="props.showActionRow"
        :modifiers="{ action: true, opened: state.open }"
      >
        <DataTableColumn :modifiers="{ action: true }">
          <DataTableButton
            :modifiers="{
              round: true,
              less: true,
              shadowed: true,
            }"
            @click.stop="state.open = false"
          />
        </DataTableColumn>
        <DataTableColumn :modifiers="{ inner: true }">
          <slot name="actionColumnInner" :obj="props.obj" :close="() => { state.open = false; }" />
        </DataTableColumn>
      </DataTableRow>
      <DataTableColumn
        v-if="props.showActionRow"
        :modifiers="{ action: true }"
      >
        <DataTableButton
          :modifiers="{
            round: true,
            more: true,
            shadowed: true,
          }"
          @click.stop="state.open = true"
        />
        <slot name="actionColumn" :obj="props.obj" />
      </DataTableColumn>
      <DataTableColumn :modifiers="{ inner: true, noActionRow: !props.showActionRow }">
        <DataTableColumn
          v-for="([column, columnData], j) in Object.entries(props.columns)"
          :key="`column${j}`"
          :class="columnData.className"
          :data-label="columnData.label"
          :aria-labelledby="`${toCamelCase(columnData.label)}${$uid}`"
        >
          <slot
            :name="column"
            :obj="props.obj"
            :value="props.obj[column]"
            :column="columnData"
          >
            {{ props.obj[column] }}
          </slot>
        </DataTableColumn>
      </DataTableColumn>
    </div>
    <slot name="afterRow" :obj="props.obj" />
  </DataTableRow>
</template>

<script setup lang="ts" generic="E, T extends Record<string, E>">
import { reactive, inject } from 'vue';

import DataTableRow from '@renderer/components/Materials/DataTable/Row.vue';
import DataTableColumn from '@renderer/components/Materials/DataTable/Column.vue';
import DataTableButton from '@renderer/components/Materials/DataTable/Button.vue';

import { toCamelCase } from '@/renderer/core/utils';
import type { ISlots, IProps, IState } from './BodyRow';

defineOptions({ name: 'DataTableBodyRow' });

defineSlots<ISlots<T, any>>();

const emit = defineEmits<{
  contextmenu: [event: MouseEvent, obj: T];
  selectLine: [obj: T];
}>();

const $uid = inject('uid');

const props = withDefaults(defineProps<IProps<T>>(), {
  showActionRow: true,
  showSelectionRow: false,
});

const state = reactive<IState>({
  open: false,
});

const actions = {
  handleRowClick() {
    if (props.showSelectionRow) {
      emit('selectLine', props.obj);
    }
  },
};
</script>

<style lang="scss" src="./BodyRow.scss">
</style>
