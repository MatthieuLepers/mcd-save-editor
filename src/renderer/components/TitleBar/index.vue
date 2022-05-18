<template>
  <nav class="TitleBar">
    <TitleBarMenu />
    <div class="TitleBarApp" v-if="appTitle">
      {{ appTitle }}
    </div>
    <div class="TitleBarButtonCtn">
      <button v-if="btnHelp" :disabled="!GlobalStore.enableTutorialOnRoute(this.$route)" class="TitleBarButton" @click="$emit('help')">
        <i class="icon-help"></i>
      </button>
      <button :disabled="!btnMinimize" class="TitleBarButton" @click="minimize">
        <i class="icon-minimize"></i>
      </button>
      <button :disabled="!btnMaximize" class="TitleBarButton" @click="maximize">
        <i class="icon-maximize"></i>
      </button>
      <button :disabled="!btnClose" class="TitleBarButton" @click="close">
        <i class="icon-close"></i>
      </button>
    </div>
  </nav>
</template>

<script>
import { remote } from 'electron';
import GlobalStore from '@/assets/js/stores/GlobalStore';
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
      GlobalStore,
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
      if (process.env.NODE_ENV === 'development' && this.window.isDevToolsOpened()) {
        this.window.closeDevTools();
      }
      this.window.close();
    },
  },
};
</script>

<style lang="scss" src="./index.scss">
</style>
