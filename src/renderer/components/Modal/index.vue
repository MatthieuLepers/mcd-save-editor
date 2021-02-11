<template>
  <div :class="`ModalBackDrop${open ? ' is-open' : '' }`">
    <div :id="name" :class="`Modal size-${size}`">
      <div class="ModalTitle">
        <slot name="header">{{ title }}</slot>
      </div>
      <div class="ModalContent">
        <slot />
      </div>
      <div class="ModalActions">
        <slot name="footer" :accept="accept" :refuse="refuse" :close="hide">
          <button class="btn btn-refuse" v-if="cancelOnly || okCancel" @click="refuse">
            {{ cancelLabel }}
          </button>
          <button class="btn btn-accept" v-if="okOnly || okCancel" @click="accept">
            {{ okLabel }}
          </button>
        </slot>
      </div>
      <button class="ModalCloseBtn" @click="hide"></button>
    </div>
  </div>
</template>

<script>
import ModalStore from './Store';

export default {
  name: 'Modal',
  props: {
    name: { type: String, required: true },
    title: { type: String, required: true },
    okOnly: { type: Boolean, default: false },
    cancelOnly: { type: Boolean, default: false },
    okCancel: { type: Boolean, default: false },
    cancelLabel: { type: String, default: 'Cancel' },
    okLabel: { type: String, default: 'Ok' },
    size: { type: String, default: 'xs' },
  },
  data() {
    return {
      store: ModalStore,
      open: false,
    };
  },
  methods: {
    show() {
      this.open = true;
      window.onclick = (e) => {
        if (e.target.matches('.ModalBackDrop')) {
          this.open = false;
          window.onclick = null;
        }
      };
    },
    hide() {
      this.open = false;
      this.$emit('close');
    },
    refuse() {
      this.$emit('refuse');
      this.hide();
    },
    accept() {
      this.$emit('confirm');
      this.hide();
    },
  },
  mounted() {
    this.store.add(this);
  },
  destroyed() {
    this.store.remove(this);
  },
};
</script>

<style lang="scss" src="./index.scss">
</style>
