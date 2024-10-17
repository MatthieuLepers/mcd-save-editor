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
      v-for="(page, i) in props.data"
      :key="i"
      :class="GenerateModifiers('m-datatable-pagination__item', {
        current: modelValue === i,
        skipped: !(i === 0 || i === props.data.length - 1 || i === modelValue || (modelValue - 2 <= i && modelValue + 2 >= i)),
      })"
    >
      <button
        type="button"
        @click="modelValue = i"
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

<script setup>
import { computed } from 'vue';

defineOptions({ name: 'DataTablePagination' });

const modelValue = defineModel({ type: Number });

const props = defineProps({
  data: { type: Array, required: true },
});

const State = computed(() => ({
  hasPrev: !!props.data[modelValue.value - 1],
  hasNext: !!props.data[modelValue.value + 1],
}));
</script>

<style lang="scss" src="./Pagination.scss">
</style>
