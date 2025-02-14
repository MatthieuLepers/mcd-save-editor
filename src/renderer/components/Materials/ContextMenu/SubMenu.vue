<template>
  <div
    v-show="props.visible"
    :class="GenerateModifiers('m-contextmenu-item', {
      arrowRight: true,
      disabled: props.disabled,
    })"
    @mouseover="emit('over')"
    @mouseout="emit('out')"
  >
    <div class="ContextMenuItemName">
      {{ props.label }}
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { IProps, ISlots } from './SubMenu';

defineOptions({ name: 'ContextSubMenu' });

defineSlots<ISlots>();

const emit = defineEmits(['over', 'out']);

const props = withDefaults(defineProps<IProps>(), {
  disabled: false,
  visible: true,
});
</script>
