<template>
  <div :class="GenerateModifiers('m-form-field-container', props.modifiers)">
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { ISlots, IProps } from './FieldContainer';

defineOptions({ name: 'FormFieldContainer' });

defineSlots<ISlots>();

const props = withDefaults(defineProps<IProps>(), {
  modifiers: () => ({}),
});
</script>

<style lang="scss" src="./FieldContainer.scss">
</style>
