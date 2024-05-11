<template>
  <span :class="`${props.icon} m-loader-icon`"></span>
</template>

<script setup>
defineOptions({ name: 'LoaderIcon' });

const props = defineProps({
  icon: { type: String, default: 'icon-loader' },
});
</script>

<style lang="scss" src="./Icon.scss"></style>
