<template>
  <div :class="GenerateModifiers('m-datatable-column', props.modifiers)">
    <slot />
  </div>
</template>

<script setup>
defineOptions({ name: 'DataTableColumn' });

/**
 * slots:
 * - default
 */
const props = defineProps({
  /**
   * Valid modifiers:
   * - Position : inner
   * - Type : noActionRow, action
   */
  modifiers: { type: Object, default: () => ({}) },
});
</script>

<style lang="scss" src="./Column.scss">
</style>
