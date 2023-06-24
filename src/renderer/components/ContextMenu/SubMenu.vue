<template>
  <div :class="GenerateModifiers('ContextMenuItem', { ArrowRight: true, Disabled: disabled })" v-show="visible" @mouseover="$emit('hover')" @mouseout="$emit('out')">
    <div class="ContextMenuItemName">
      {{ label }}
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'ContextMenuSubMenu',
  props: {
    disabled: { type: Boolean, default: false },
    visible: { type: Boolean, default: true },
    label: { type: String, required: true },
  },
};
</script>
