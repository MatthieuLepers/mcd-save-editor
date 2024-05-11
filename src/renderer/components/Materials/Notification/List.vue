<template>
  <ol class="m-notification-list">
    <li
      v-for="(notification, i) in notifications"
      :key="i"
      :class="GenerateModifiers('m-notification-list__item', { [notification.type]: true })"
    >
      {{ notification.text }}

      <MaterialButton
        v-if="!!notification.action"
        class="m-notification-list__item-btn"
        :icon="notification.action.icon ?? null"
        :modifiers="{ danger: true, inverted: true }"
        @click="actions.handleClickAction(notification)"
      >
        {{ notification.action.label ?? '' }}
      </MaterialButton>
    </li>
  </ol>
</template>

<script setup>
import { ref, watch } from 'vue';

import MaterialButton from '@renderer/components/Materials/Button/index.vue';

import { notificationStore } from '@renderer/components/Materials/Notification/Store';

defineOptions({ name: 'NotificationList' });

const notifications = ref(notificationStore.notifications);

const actions = {
  handleClickAction(notification) {
    if (!notification.delay) {
      notificationStore.actions.removeNotification(notification);
    }
    notification.action.callback();
  },
};

watch(() => notificationStore.notifications, (newNotifications) => {
  notifications.value = newNotifications;
});
</script>

<style lang="scss" src="./List.scss">
</style>
