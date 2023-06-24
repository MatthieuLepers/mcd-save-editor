<template>
  <div class="NotificationList">
    <NotificationItem v-for="(obj, i) in store.storage" :key="i" :notification="obj" />
  </div>
</template>

<script>
import NotificationStore from './NotificationStore';
import NotificationItem from './Item';

export default {
  name: 'NotificationList',
  components: { NotificationItem },
  data() {
    return {
      store: NotificationStore,
    };
  },
};
</script>

<style lang="scss" src="./List.scss">
</style>
