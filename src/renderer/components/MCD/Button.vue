<template>
  <button
    :disabled="props.disabled"
    :class="GenerateModifiers('MCDButton', { [props.variant]: true, [props.size]: true })"
    :title="props.title"
    @click="emit('click')"
  >
    <i :class="`icon-${props.icon}`" v-if="props.icon"></i>
    <span v-if="props.label">{{ props.label }}</span>
  </button>
</template>

<script setup>
defineOptions({ name: 'MCDButton' });

const emit = defineEmits(['click']);

const props = defineProps({
  icon: { type: String, default: null },
  label: { type: String, default: null },
  title: { type: String, default: null },
  variant: { type: String, default: 'light' },
  size: { type: String, default: 'sm' },
  disabled: { type: Boolean, default: false },
});
</script>

<style lang="scss" src="./Button.scss">
</style>
