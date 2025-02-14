<template>
  <ol class="m-notification-list">
    <li
      v-for="(notification, i) in notifications"
      :key="i"
      :class="GenerateModifiers('m-notification-list__item', { [notification.type]: true })"
    >
      <slot :name="notification?.id ?? 'text'" :notification="notification">
        {{ notification.text }}
      </slot>

      <MaterialButton
        v-if="!!notification.action"
        class="m-notification-list__item-btn"
        :icon="notification.action.icon"
        :modifiers="{ danger: true, inverted: true }"
        @click="actions.handleClickAction(notification)"
      >
        {{ notification.action.label ?? '' }}
      </MaterialButton>
    </li>
  </ol>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

import MaterialButton from '@renderer/components/Materials/Button/index.vue';

import { type INotification, notificationStore } from './Store';
import type { ISlots } from './List';

defineOptions({ name: 'NotificationList' });

defineSlots<ISlots>();

const notifications = ref(notificationStore.notifications);

const actions = {
  handleClickAction(notification: INotification) {
    if (!notification.delay) {
      notificationStore.actions.removeNotification(notification);
    }
    notification.action?.callback();
  },
};

watch(() => notificationStore.notifications, (notifications) => {
  notifications.value = notifications.value;
});
</script>

<style lang="scss" src="./List.scss">
</style>
