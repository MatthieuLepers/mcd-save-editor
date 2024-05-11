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
    <span v-if="props.icon" class="m-button__icon" :class="props.icon"></span>
    <slot />
  </button>
</template>

<script setup>
import { useSlots } from 'vue';

defineOptions({ name: 'MButton' });

const slots = useSlots();

const props = defineProps({
  type: { type: String, default: 'button' },
  disabled: { type: Boolean, default: false },
  icon: { type: String, default: null },
  iconSide: { type: String, default: 'left' },
  /**
   * Valid modifiers:
   * - Color : success, secondary, warning, danger, cancel
   * - Style : inverted, squared
   */
  modifiers: { type: Object, default: () => ({}) },
});
</script>

<style lang="scss" src="./index.scss">
</style>
