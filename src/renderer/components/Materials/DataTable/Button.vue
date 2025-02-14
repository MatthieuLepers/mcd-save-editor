<template>
  <button :class="GenerateModifiers('m-datatable-button', props.modifiers)">
    <span
      v-if="props.icon"
      :class="['m-datatable-button__icon', props.icon]"
    />
    <div class="m-datatable-button__content">
      <slot>
        <span v-if="props.modifiers.more" />
        <span v-else>{{ props.label }}</span>
      </slot>
    </div>
  </button>
</template>

<script setup lang="ts">
import { ISlots, IProps, Modifiers } from './Button';

defineOptions({ name: 'DataTableButton' });

defineSlots<ISlots>();

const props = withDefaults(defineProps<IProps>(), {
  modifiers: () => ({} as Record<Modifiers, boolean>),
});
</script>

<style lang="scss" src="./Button.scss">
</style>
