<template>
  <nav class="TitleBar">
    <TitleBarMenu />
    <div class="TitleBarApp" v-if="appTitle">
      {{ appTitle }}
    </div>
    <div class="TitleBarButtonCtn">
      <button v-if="btnHelp" class="TitleBarButton TitleBarButtonHelp" @click="$emit('help')">
        <i class="icon-help"></i>
      </button>
      <button :disabled="!btnMinimize" class="TitleBarButton TitleBarButtonMinimize" @click="minimize">
        <i class="icon-minimize"></i>
      </button>
      <button :disabled="!btnMaximize" class="TitleBarButton TitleBarButtonMaximize" @click="maximize">
        <i class="icon-maximize"></i>
      </button>
      <button :disabled="!btnClose" class="TitleBarButton TitleBarButtonClose" @click="close">
        <i class="icon-close"></i>
      </button>
    </div>
  </nav>
</template>

<script>
import { remote } from 'electron';
import TitleBarMenu from './Menu';

export default {
  name: 'TitleBar',
  components: { TitleBarMenu },
  props: {
    btnMinimize: { type: Boolean, default: true },
    btnMaximize: { type: Boolean, default: true },
    btnClose: { type: Boolean, default: true },
    btnHelp: { type: Boolean, default: true },
    appTitle: { type: String, default: null },
  },
  data() {
    return {
      window: remote.getCurrentWindow(),
    };
  },
  methods: {
    minimize() {
      this.window.minimize();
    },
    maximize() {
      if (this.window.isMaximized()) {
        this.window.unmaximize();
      } else {
        this.window.maximize();
      }
    },
    close() {
      this.window.close();
    },
  },
};
</script>

<style lang="scss" src="./index.scss">
</style>
