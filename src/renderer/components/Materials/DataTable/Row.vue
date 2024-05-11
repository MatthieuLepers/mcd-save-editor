<template>
  <div
    :class="GenerateModifiers('m-datatable-row', props.modifiers)"
    @click="emit('click', $event)"
    @contextmenu.prevent.stop="emit('contextmenu', $event)"
  >
    <slot />
  </div>
</template>

<script setup>
defineOptions({ name: 'DataTableRow' });

const emit = defineEmits(['click', 'contextmenu']);

const props = defineProps({
  /**
   * Valid modifiers
   * Type : action, selectable, grabbable
   * State : opened, selected, grabbed
   */
  modifiers: { type: Object, default: () => ({}) },
});
</script>

<style lang="scss" src="./Row.scss">
</style>
