<template>
  <button
    :class="GenerateModifiers('m-datatable-button', props.modifiers)"
  >
    <span
      v-if="props.icon"
      :class="['m-datatable-button__icon', props.icon]"
    ></span>
    <div class="m-datatable-button__content">
      <slot>
        <span v-if="props.modifiers.more"></span>
        <span v-else>{{ props.label }}</span>
      </slot>
    </div>
  </button>
</template>

<script setup>
defineOptions({ name: 'DataTableButton' });

const props = defineProps({
  label: { type: String, default: null },
  icon: { type: String, default: null },
  /**
   * Valid modifiers:
   * - Shape : round, longRound, shadowed
   * - State : focused
   * - Type : sort, sortAsc, sortDesc, more, less
   * - Color : secondary, danger
   */
  modifiers: { type: Object, default: () => ({}) },
});
</script>

<style lang="scss" src="./Button.scss">
</style>
