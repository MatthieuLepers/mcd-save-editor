<template>
  <button
    v-show="props.visible"
    type="button"
    :class="GenerateModifiers('m-contextmenu-item', { disabled: props.disabled })"
    @click="actions.handleOnClicked"
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

<script setup>
defineOptions({ name: 'ContextMenuItem' });

const emit = defineEmits(['click']);

const props = defineProps({
  disabled: { type: Boolean, default: false },
  visible: { type: Boolean, default: true },
  icon: { type: String, default: null },
  label: { type: String, required: true },
  shortcut: { type: String, default: null },
});

const actions = {
  handleOnClicked() {
    emit('click');
  },
};
</script>

<style lang="scss" src="./Item.scss">
</style>
