<template>
  <ul class="m-datatable-pagination">
    <li :class="GenerateModifiers('m-datatable-pagination__item', { edge: true, prev: true })">
      <button
        type="button"
        v-if="State.hasPrev"
        aria-label="Page précédente"
        @click="modelValue -= 1"
      />
    </li>
    <li
      v-for="(_page, i) in props.data"
      :key="i"
      :class="GenerateModifiers('m-datatable-pagination__item', {
        current: modelValue - 1 === i,
        skipped: !(i === 0 || i === props.data.length - 1 || i === modelValue || (modelValue - 2 <= i && modelValue + 2 >= i)),
      })"
    >
      <button
        type="button"
        @click="modelValue = i + 1"
      >
        {{ i + 1 }}
      </button>
    </li>
    <li :class="GenerateModifiers('m-datatable-pagination__item', { edge: true, next: true })">
      <button
        type="button"
        v-if="State.hasNext"
        aria-label="Page suivante"
        @click="modelValue += 1"
      />
    </li>
  </ul>
</template>

<script setup lang="ts" generic="E, T extends Record<string, E>">
import { computed } from 'vue';

import type { IProps } from './Pagination';

defineOptions({ name: 'DataTablePagination' });

const modelValue = defineModel({ type: Number, default: 1 });

const props = withDefaults(defineProps<IProps<T>>(), {
});

const State = computed(() => ({
  hasPrev: !!props.data[modelValue.value - 1],
  hasNext: !!props.data[modelValue.value + 1],
}));
</script>

<style lang="scss" src="./Pagination.scss">
</style>
