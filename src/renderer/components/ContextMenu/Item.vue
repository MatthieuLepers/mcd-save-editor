<template>
  <button :class="GenerateModifiers('ContextMenuItem', { Disabled: disabled })" v-show="visible" @click="handleOnClicked">
    <div class="ContextMenuItemIcon">
      <i :class="`icon-${icon}`" v-if="icon"></i>
    </div>
    <div class="ContextMenuItemName">
      {{ label }}
    </div>
    <div class="ContextMenuItemShortcut">
      {{ shortcut }}
    </div>
  </button>
</template>

<script>
import { remote } from 'electron';

export default {
  name: 'ContextMenuItem',
  props: {
    disabled: { type: Boolean, default: false },
    visible: { type: Boolean, default: true },
    icon: { type: String, default: null },
    label: { type: String, required: true },
    shortcut: { type: String, default: null },
  },
  mounted() {
    this.$parent.menu.append(new remote.MenuItem({
      label: 'Print',
      accelerator: this.shortcut,
      click: this.handleOnClicked.bind(this),
    }));
  },
  methods: {
    handleOnClicked() {
      if (!this.disabled) {
        this.$emit('click');
      }
    },
  },
};
</script>

<style lang="scss" src="./Item.scss">
</style>
