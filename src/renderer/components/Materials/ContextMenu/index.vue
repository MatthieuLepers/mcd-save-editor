<template>
  <ul
    v-show="state.isVisible"
    :class="`${GenerateModifiers('m-contextmenu', { shadowed: props.shadowed })} ${props.anchor}`"
  >
    <slot />
  </ul>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue';

import { IProps, IState, type ISlots } from '.';

defineOptions({ name: 'ContextMenu' });

defineSlots<ISlots>();

const props = withDefaults(defineProps<IProps>(), {
  visible: false,
  anchor: 'bottom left',
  shadowed: false,
});

const state = reactive<IState>({
  isVisible: props.visible,
});

watch(() => props.visible, (newVal) => {
  state.isVisible = newVal;
});
</script>

<style lang="scss" src="./index.scss">
</style>
