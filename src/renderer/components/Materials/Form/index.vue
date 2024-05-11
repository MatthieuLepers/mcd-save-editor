<template>
  <form class="m-form" @submit="emit('submit', $event)">
    <slot />
  </form>
</template>

<script setup>
defineOptions({
  name: 'MForm',
  inheritAttrs: false,
});

const emit = defineEmits(['submit']);
</script>

<style lang="scss" src="./index.scss">
</style>
