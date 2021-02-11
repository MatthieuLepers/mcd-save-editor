<template>
  <li class="TitleBarMenuItem">
    <button class="TitleBarMenuItemButton" @click="$emit('click', id)">
      {{ label }}
    </button>
    <slot />
  </li>
</template>

<script>
export default {
  name: 'TitleMenuItem',
  props: {
    id: { type: String, required: true },
    label: { type: String, default: '' },
  },
};
</script>

<style lang="scss" src="./MenuItem.scss">
</style>
