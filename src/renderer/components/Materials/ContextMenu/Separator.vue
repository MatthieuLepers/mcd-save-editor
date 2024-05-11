<template>
  <div :class="GenerateModifiers('m-contextmenu-item', { separator: true })"></div>
</template>

<script setup>
defineOptions({ name: 'ContextMenuSeparator' });
</script>

<style lang="scss" src="./Separator.scss">
</style>
