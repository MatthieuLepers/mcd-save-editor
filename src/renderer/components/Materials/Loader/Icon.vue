<template>
  <span :class="`${props.icon} m-loader-icon`" />
</template>

<script setup lang="ts">
import type { IProps } from './Icon';

defineOptions({ name: 'LoaderIcon' });

const props = withDefaults(defineProps<IProps>(), {
  icon: 'icon-loader',
});
</script>

<style lang="scss" src="./Icon.scss"></style>
