<template>
  <div class="m-datatable">
    <div class="m-datatable__header">
      <DataTableRow>
        <DataTableColumn
          v-if="props.showActionRow"
          :modifiers="{ action: true }"
        />
        <DataTableColumn :modifiers="{ inner: true, noActionRow: !props.showActionRow }">
          <DataTableColumn
            v-for="([column, columnData], i) in Object.entries(props.columns)"
            :key="i"
            :class="columnData.className"
            :data-label="columnData.label"
          >
            <DataTableButton
              v-if="!actions.isSortDisabled(column)"
              :modifiers="{ longRound: true, [`sort${actions.getSortingDirection(column)}`]: true }"
              @click="actions.sortBy(column)"
            >
              {{ columnData.label }}
            </DataTableButton>
            <span v-else>
              {{ columnData.label }}
            </span>
          </DataTableColumn>
        </DataTableColumn>
      </DataTableRow>
    </div>
    <div class="m-datatable__body">
      <Draggable
        :list="[...State.result]"
        :move="State.isGrabbable ? props.allowMoveFn : () => false"
        itemKey="id"
        @change="actions.handleOrderChange"
      >
        <template #item="{ element }">
          <div>
            <DataTableBodyRow
              :columns="props.columns"
              :obj="element"
              :showActionRow="props.showActionRow"
              :showSelectionRow="props.showSelectionRow"
              @selectLine="emit('selectLine', $event)"
            >
              <template #actionColumnInner="{ obj, close }">
                <slot name="actionColumnInner" :obj="obj" :close="close" />
              </template>
              <template #actionColumn="{ obj }">
                <slot name="actionColumn" :obj="obj" />
              </template>
              <template
                v-for="(columnName, i) in Object.keys(props.columns)"
                :key="i"
                #[columnName]="{ obj, value, column }"
              >
                <slot
                  :name="columnName"
                  :obj="obj"
                  :value="value"
                  :column="column"
                >
                  {{ value }}
                </slot>
              </template>
              <template #secretArea="{ obj }">
                <slot name="secretArea" :obj="obj" />
              </template>
            </DataTableBodyRow>
            <slot name="lastRow" :obj="element" />
          </div>
        </template>
      </Draggable>
    </div>
    <div
      v-if="props.paginate && State.paginated.length > 1"
      class="m-datatable__footer"
    >
      <DataTablePagination :data="State.paginated" :perPage="perPage" v-model="page" />
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, watch } from 'vue';
import Draggable from 'vuedraggable';

import DataTableRow from '@renderer/components/Materials/DataTable/Row.vue';
import DataTableBodyRow from '@renderer/components/Materials/DataTable/BodyRow.vue';
import DataTableColumn from '@renderer/components/Materials/DataTable/Column.vue';
import DataTableButton from '@renderer/components/Materials/DataTable/Button.vue';
import DataTablePagination from '@renderer/components/Materials/DataTable/Pagination.vue';

defineOptions({ name: 'DataTable' });

const emit = defineEmits(['orderChange', 'selectLine']);

const page = defineModel('page', { type: Number, default: 0 });

/**
 * slots:
 * - actionColumnInner : Columns in actions row
 * - actionColumn      : Buttons column in actions row
 * - [column]          : column id
 * - secretArea        : After row
 * - lastRow           : After rows
 */
const props = defineProps({
  columns: { type: Object, default: () => ({}) },
  data: { type: Array, default: () => [] },
  perPage: { type: Number, default: 20 },
  filters: { type: Object, default: () => ({}) },
  paginate: { type: Boolean, default: true },
  showActionRow: { type: Boolean, default: true },
  showSelectionRow: { type: Boolean, default: false },
  allowMoveFn: { type: Function, default: () => true },
});

const state = reactive({
  perPage: props.perPage,
  sorting: {
    key: null,
    direction: '',
  },
});

const State = computed(() => {
  const filtered = Object
    .values(props.filters)
    .reduce((objList, fn) => objList.filter(fn), props.data)
  ;
  const sorted = (() => {
    const { key, direction } = state.sorting;
    if (!key || !direction) {
      return filtered;
    }
    return filtered.slice().sort((a, b) => props.columns[key].filter(a, b, direction === 'Desc'));
  })();
  const paginated = sorted.reduce((acc, val, i) => {
    const ch = Math.floor(i / state.perPage);
    acc[ch] = [].concat((acc[ch] || []), val);
    return acc;
  }, []);
  const result = props.paginate
    ? paginated[page.value - 1] || []
    : sorted
  ;
  const isGrabbable = result.every((obj) => obj.order !== undefined);

  return {
    filtered,
    sorted,
    paginated,
    result,
    isGrabbable,
  };
});

const actions = {
  isSortDisabled(key) {
    return !props.columns[key].filter;
  },
  getSortingDirection(key) {
    if (state.sorting.key && state.sorting.key === key) {
      return state.sorting.direction || '';
    }
    return '';
  },
  sortBy(key) {
    const sortDirection = actions.getSortingDirection(key);
    state.sorting = {
      key,
      direction: !sortDirection || sortDirection === 'Desc' ? 'Asc' : 'Desc',
    };
  },
  handleOrderChange(e) {
    const { newIndex, oldIndex } = e.moved;
    emit('orderChange', {
      account: State.value.result[newIndex],
      order: oldIndex,
    }, {
      account: State.value.result[oldIndex],
      order: newIndex,
    });
  },
};

watch(() => props.perPage, (newVal) => {
  state.perPage = newVal;
});
</script>

<style lang="scss" src="./index.scss">
</style>
