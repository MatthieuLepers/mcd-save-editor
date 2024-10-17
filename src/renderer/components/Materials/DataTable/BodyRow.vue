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
            :modifiers="{ round: true, less: true, shadowed: true }"
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
          :modifiers="{ round: true, more: true, shadowed: true }"
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
        >
          <slot
            :name="column"
            :obj="props.obj"
            :value="props.obj[column]"
            :column="column"
          >
            {{ props.obj[column] }}
          </slot>
        </DataTableColumn>
      </DataTableColumn>
    </div>
    <slot name="secretArea" :obj="props.obj" />
  </DataTableRow>
</template>

<script setup>
import { reactive } from 'vue';

import DataTableRow from '@renderer/components/Materials/DataTable/Row.vue';
import DataTableColumn from '@renderer/components/Materials/DataTable/Column.vue';
import DataTableButton from '@renderer/components/Materials/DataTable/Button.vue';

defineOptions({ name: 'DataTableBodyRow' });

const emit = defineEmits(['contextmenu', 'selectLine']);

/**
 * slots:
 * - actionColumnInner : Columns in actions row
 * - actionColumn      : Buttons column in actions row
 * - [column]          : column id
 * - secretArea        : After row
 */
const props = defineProps({
  columns: { type: Object, default: () => ({}) },
  obj: { type: Object, default: () => ({}) },
  showActionRow: { type: Boolean, default: true },
  showSelectionRow: { type: Boolean, default: false },
});

const state = reactive({
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
