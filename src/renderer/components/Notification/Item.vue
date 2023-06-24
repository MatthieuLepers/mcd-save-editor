<template>
  <div :class="GenerateModifiers('NotificationItem', { [notification.variant]: true, Disapear: disapear })">
    {{ notification.msg }}
  </div>
</template>

<script>
import NotificationStore from './NotificationStore';

export default {
  name: 'NotificationItem',
  props: {
    notification: { type: Object, required: true },
  },
  data() {
    return { disapear: false };
  },
  mounted() {
    window.setTimeout(() => {
      this.disapear = true;
      window.setTimeout(() => {
        NotificationStore.removeNotification(this.notification);
      }, 500);
    }, 3000);
  },
};
</script>

<style lang="scss" src="./Item.scss">
</style>
