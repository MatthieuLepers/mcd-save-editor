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
            :id="`${toCamelCase(columnData.label)}${$uid}`"
          >
            <DataTableButton
              v-if="!actions.isSortDisabled(column)"
              :modifiers="{
                longRound: true,
                [`sort${actions.getSortingDirection(column)}`]: true,
              }"
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
      <VueDraggableNext
        :list="[...State.result]"
        :move="State.isGrabbable ? props.allowMoveFn : () => false"
        itemKey="id"
        @change="actions.handleOrderChange"
      >
        <div
          v-for="(element, i) in State.result"
          :key="i"
        >
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
              <slot name="afterRow" :obj="obj" />
            </template>
          </DataTableBodyRow>
          <slot name="lastRow" :obj="element" />
        </div>
      </VueDraggableNext>
    </div>
    <div
      v-if="props.paginate && State.paginated.length > 1"
      class="m-datatable__footer"
    >
      <DataTablePagination :data="State.paginated" :perPage="perPage" v-model="page" />
    </div>
  </div>
</template>

<script setup lang="ts" generic="E, T extends Record<string, E>">
import {
  reactive,
  computed,
  watch,
  getCurrentInstance,
  provide,
} from 'vue';
import { VueDraggableNext } from 'vue-draggable-next';

import DataTableRow from '@renderer/components/Materials/DataTable/Row.vue';
import DataTableBodyRow from '@renderer/components/Materials/DataTable/BodyRow.vue';
import DataTableColumn from '@renderer/components/Materials/DataTable/Column.vue';
import DataTableButton from '@renderer/components/Materials/DataTable/Button.vue';
import DataTablePagination from '@renderer/components/Materials/DataTable/Pagination.vue';

import { chunkArray, toCamelCase } from '@renderer/core/utils';
import type { ISlots, IProps, IState } from '.';

defineOptions({ name: 'DataTable' });

defineSlots<ISlots<T, any>>();

const $uid = getCurrentInstance()?.uid;
const emit = defineEmits<{
  selectLine: [obj: T];
}>();

provide('uid', $uid);

const page = defineModel('page', { type: Number, default: 1 });

const props = withDefaults(defineProps<IProps<T>>(), {
  columns: () => ({}),
  data: () => [],
  perPage: 20,
  filters: () => ({}),
  paginate: true,
  showActionRow: true,
  showSelectionRow: false,
  allowMoveFn: () => true,
});

const state = reactive<IState>({
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
    return filtered.slice().sort((a: T, b: T) => props.columns[key].filter!(a, b, direction === 'Desc'));
  })();
  const paginated = chunkArray(sorted, state.perPage);
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
  isSortDisabled(key: string) {
    return !props.columns[key].filter;
  },
  getSortingDirection(key: string) {
    if (state.sorting.key && state.sorting.key === key) {
      return state.sorting.direction || '';
    }
    return '';
  },
  sortBy(key: string) {
    const sortDirection = actions.getSortingDirection(key);
    state.sorting = {
      key,
      direction: !sortDirection || sortDirection === 'Desc' ? 'Asc' : 'Desc',
    };
  },
  handleOrderChange() {
    State.value.result.forEach((obj, i) => {
      // @ts-ignore
      obj.order = i;
    });
  },
};

watch(() => props.perPage, (perPage) => {
  state.perPage = perPage;
});
</script>

<style lang="scss" src="./index.scss">
</style>
