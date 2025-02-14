<template>
  <div :class="GenerateModifiers('m-datatable-column', props.modifiers)">
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { ISlots, IProps } from './Column';

defineOptions({ name: 'DataTableColumn' });

defineSlots<ISlots>();

const props = withDefaults(defineProps<IProps>(), {
  modifiers: () => ({}),
});
</script>

<style lang="scss" src="./Column.scss">
</style>
