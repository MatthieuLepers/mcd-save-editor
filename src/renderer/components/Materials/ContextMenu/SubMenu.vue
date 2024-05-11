<template>
  <div
    v-show="props.visible"
    :class="GenerateModifiers('m-contextmenu-item', { arrowRight: true, Disabled: props.disabled })"
    @mouseover="emit('over')"
    @mouseout="emit('out')"
  >
    <div class="ContextMenuItemName">
      {{ props.label }}
    </div>
    <slot />
  </div>
</template>

<script setup>
defineOptions({ name: 'ContextSubMenu' });

const emit = defineEmits(['over', 'out']);

const props = defineProps({
  disabled: { type: Boolean, default: false },
  visible: { type: Boolean, default: true },
  label: { type: String, required: true },
});
</script>
