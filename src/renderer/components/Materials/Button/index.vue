<template>
  <button
    :class="GenerateModifiers('m-button', {
      ...props.modifiers,
      disabled: props.disabled,
      iconed: !!props.icon,
      [`iconed-${props.iconSide}`]: true,
      iconOnly: !Object.keys(slots).length,
    })"
    :type="props.type"
    :disabled="props.disabled"
  >
    <div v-if="props.icon === true" class="m-button__icon">
      <slot name="icon" />
    </div>
    <span
      v-else-if="props.icon"
      class="m-button__icon"
      :class="props.icon"
      aria-hidden="true"
    />
    <slot />
  </button>
</template>

<script setup lang="ts">
import { useSlots } from 'vue';

import type { ISlots, IProps } from '.';

defineOptions({ name: 'MButton' });

defineSlots<ISlots>();

const slots = useSlots();

const props = withDefaults(defineProps<IProps>(), {
  type: 'button',
  disabled: false,
  iconSide: 'left',
  modifiers: () => ({}),
});
</script>

<style lang="scss" src="./index.scss">
</style>
