<template>
  <button
    v-show="props.visible"
    type="button"
    :class="GenerateModifiers('m-contextmenu-item', { disabled: props.disabled })"
  >
    <div class="m-contextmenu-item__icon">
      <i :class="props.icon" v-if="props.icon"></i>
    </div>
    <div class="m-contextmenu-item__name">
      {{ props.label }}
    </div>
    <div class="m-contextmenu-item__shortcut">
      {{ props.shortcut }}
    </div>
  </button>
</template>

<script setup lang="ts">
import { IProps } from './Item';

defineOptions({ name: 'ContextMenuItem' });

const props = withDefaults(defineProps<IProps>(), {
  disabled: false,
  visible: true,
});
</script>

<style lang="scss" src="./Item.scss">
</style>
