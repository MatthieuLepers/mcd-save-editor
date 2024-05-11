<template>
  <li class="m-title-bar__menu-item">
    <button
      type="button"
      class="m-title-bar__menu-item__button"
      @click="emit('click', $event, props.id)"
    >
      {{ props.label }}
    </button>
    <slot />
  </li>
</template>

<script setup>
defineOptions({ name: 'TitleBarMenuItem' });

const emit = defineEmits(['click']);

const props = defineProps({
  id: { type: String, required: true },
  label: { type: String, default: '' },
});
</script>

<style lang="scss" src="./MenuItem.scss">
</style>
