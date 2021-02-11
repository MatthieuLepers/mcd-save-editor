<template>
  <div :class="`NotificationItem ${variant} ${disapear ? 'disapear' : ''}`">
    <slot />
  </div>
</template>

<script>
import NotificationStore from './NotificationStore';

export default {
  name: 'NotificationItem',
  props: {
    variant: { type: String, default: 'success' },
    index: { type: Number, default: 0 },
  },
  data() {
    return {
      disapear: false,
    };
  },
  mounted() {
    window.setTimeout(() => {
      this.disapear = true;
      window.setTimeout(() => {
        NotificationStore.removeNotification(this.index);
      }, 500);
    }, 3000);
  },
};
</script>

<style lang="scss" src="./Item.scss">
</style>
