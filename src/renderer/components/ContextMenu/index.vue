<template>
  <ul :class="`ContextMenu ${position}`" v-show="isVisible" @click="attachMenu">
    <slot />
  </ul>
</template>

<script>
import { remote } from 'electron';

export default {
  name: 'ContextMenu',
  props: {
    visible: { type: Boolean, default: false },
    position: { type: String, default: 'bottom left' },
  },
  data() {
    return {
      menu: new remote.Menu(),
      isVisible: this.visible,
    };
  },
  methods: {
    attachMenu() {
      remote.Menu.setApplicationMenu(this.menu);
    },
  },
  mounted() {
    this.attachMenu();
  },
  watch: {
    visible() {
      this.isVisible = this.visible;
    },
  },
};
</script>

<style lang="scss" src="./index.scss">
</style>
