<template>
  <div
    :class="GenerateModifiers('m-datatable-row', props.modifiers)"
    @click="emit('click', $event)"
    @contextmenu.prevent.stop="emit('contextmenu', $event)"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { ISlots, IProps } from './Row';

defineOptions({ name: 'DataTableRow' });

defineSlots<ISlots>();

const emit = defineEmits<{
  click: [e: MouseEvent];
  contextmenu: [e: MouseEvent];
}>();

const props = withDefaults(defineProps<IProps>(), {
  modifiers: () => ({}),
});
</script>

<style lang="scss" src="./Row.scss">
</style>
