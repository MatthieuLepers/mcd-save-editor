<template>
  <button :class="`MCDButton MCDButton--${variant} MCDButton--${size}`" :title="title" @click="$emit('click')">
    <i :class="`icon-${icon}`" v-if="icon"></i>
    <span v-if="label">{{ label }}</span>
  </button>
</template>

<script>
export default {
  name: 'MCDButton',
  props: {
    icon: { type: String, default: null },
    label: { type: String, default: null },
    title: { type: String, default: null },
    variant: { type: String, default: 'light' },
    size: { type: String, default: 'sm' },
  },
};
</script>

<style lang="scss" src="./Button.scss">
</style>
