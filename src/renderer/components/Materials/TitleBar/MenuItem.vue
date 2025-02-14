<template>
  <li class="m-title-bar__menu-item">
    <button
      type="button"
      class="m-title-bar__menu-item__button"
      @click="emit('click', $event, props.id)"
    >
      {{ props.label }}
    </button>
    <slot />
  </li>
</template>

<script setup lang="ts">
import type { IProps, ISlots } from './MenuItem';

defineOptions({ name: 'TitleBarMenuItem' });

defineSlots<ISlots>();

const emit = defineEmits<{
  click: [e: MouseEvent, id: string];
}>();

const props = withDefaults(defineProps<IProps>(), {
  label: '',
});
</script>

<style lang="scss" src="./MenuItem.scss">
</style>
