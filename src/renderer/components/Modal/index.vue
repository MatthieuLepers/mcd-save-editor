<template>
  <div :class="GenerateModifiers('ModalBackDrop', { Open: open })">
    <div :id="name" :class="GenerateModifiers('Modal', { [size]: true })">
      <div class="ModalTitle">
        <slot name="header">{{ title }}</slot>
      </div>
      <div class="ModalContent">
        <slot />
      </div>
      <div class="ModalActions">
        <slot name="footer" :accept="accept" :refuse="refuse" :close="hide">
          <button :class="GenerateModifiers('ModalButton', { Refuse: true })" v-if="cancelOnly || okCancel" @click="refuse">
            {{ cancelLabel }}
          </button>
          <button :class="GenerateModifiers('ModalButton', { Accept: true })" v-if="okOnly || okCancel" @click="accept">
            {{ okLabel }}
          </button>
        </slot>
      </div>
      <button :class="GenerateModifiers('ModalButton', { Close: true })" v-if="closable" @click="hide"></button>
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
    closable: { type: Boolean, default: true },
    autoCloseOnConfirm: { type: Boolean, default: true },
    autoCloseOnRefuse: { type: Boolean, default: true },
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
      if (this.closable) {
        window.onclick = (e) => {
          if (e.target.matches('.ModalBackDrop')) {
            this.open = false;
            window.onclick = null;
          }
        };
      }
    },
    hide() {
      this.open = false;
      this.$emit('close');
    },
    refuse() {
      this.$emit('refuse');
      if (this.autoCloseOnRefuse) {
        this.hide();
      }
    },
    accept() {
      this.$emit('confirm');
      if (this.autoCloseOnConfirm) {
        this.hide();
      }
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
