<template>
  <ul
    v-show="state.isVisible"
    :class="`${GenerateModifiers('m-contextmenu', { shadowed: props.shadowed })} ${props.anchor}`"
  >
    <slot />
  </ul>
</template>

<script setup>
import { reactive, watch } from 'vue';

defineOptions({ name: 'ContextMenu' });

const props = defineProps({
  visible: { type: Boolean, default: false },
  anchor: { type: String, default: 'bottom left' },
  shadowed: { type: Boolean, default: false },
});

const state = reactive({
  isVisible: props.visible,
});

watch(() => props.visible, (newVal) => {
  state.isVisible = newVal;
});
</script>

<style lang="scss" src="./index.scss">
</style>
