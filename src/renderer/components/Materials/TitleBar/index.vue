<template>
  <nav class="m-title-bar">
    <slot name="menu" :windowName="props.name" />

    <div class="m-title-bar__app" v-if="props.appTitle">
      {{ props.appTitle }}
    </div>
    <div class="m-title-bar__button-ctn">
      <button
        v-if="props.showHelp"
        type="button"
        class="m-title-bar__button"
        @click="emit('help')"
      >
        <span v-icon:help />
      </button>
      <button
        v-if="props.minimizable"
        type="button"
        class="m-title-bar__button"
        @click="actions.minimize"
      >
        <span v-icon:minimize />
      </button>
      <button
        v-if="props.maximizable || props.minimizable"
        :disabled="!props.maximizable"
        class="m-title-bar__button"
        @click="actions.maximize">
        <span v-icon:maximize />
      </button>
      <button
        v-if="props.closable"
        :class="GenerateModifiers('m-title-bar__button', { close: true })"
        @click="actions.close"
      >
        <span v-icon:close />
      </button>
    </div>
  </nav>
</template>

<script setup>
defineOptions({ name: 'TitleBar' });

const emit = defineEmits(['help', 'minimize', 'maximize', 'close']);

const props = defineProps({
  name: { type: String, required: true },
  minimizable: { type: Boolean, default: true },
  maximizable: { type: Boolean, default: true },
  closable: { type: Boolean, default: true },
  showHelp: { type: Boolean, default: true },
  appTitle: { type: String, default: null },
});

const actions = {
  minimize() {
    emit('minimize');
    api.send(`minimize:${props.name}`);
  },
  maximize() {
    emit('maximize');
    api.send(`maximize:${props.name}`);
  },
  close() {
    emit('close');
    api.send(`close:${props.name}`);
  },
};
</script>

<style lang="scss" src="./index.scss">
</style>
