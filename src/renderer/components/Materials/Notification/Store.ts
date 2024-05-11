import { ref } from 'vue';

export enum NotificationTypeEnum {
  ERROR = 'error',
  WARNING = 'warning',
  SUCCESS = 'success',
  INFO = 'info',
}

export interface INotification {
  type: NotificationTypeEnum;
  text: string;
  delay: number;
  action?: {
    callback: Function;
    label?: string;
    icon?: string;
  },
}

const useNotificationStore = () => {
  const notifications = ref([] as INotification[]);

  const actions = {
    pushRawNotification(notification: INotification) {
      notifications.value.push(notification);
      if (notification.delay > 0) {
        window.setTimeout(() => {
          actions.removeNotification(notification);
        }, notification.delay);
      }
    },
    pushNotification(type: NotificationTypeEnum, text: string, delay = 3000) {
      const notification = { type, text, delay };
      actions.pushRawNotification(notification);
    },
    success(text: string, delay = 3000) {
      actions.pushNotification(NotificationTypeEnum.SUCCESS, text, delay);
    },
    warning(text: string, delay = 3000) {
      actions.pushNotification(NotificationTypeEnum.WARNING, text, delay);
    },
    error(text: string, delay = 3000) {
      actions.pushNotification(NotificationTypeEnum.ERROR, text, delay);
    },
    info(text: string, delay = 3000) {
      actions.pushNotification(NotificationTypeEnum.INFO, text, delay);
    },
    removeNotification(notification: INotification) {
      const index = notifications.value.indexOf(notification);
      if (index > -1) {
        notifications.value.splice(index, 1);
      }
    },
  };

  return {
    notifications,
    actions,
  };
};

export const notificationStore = useNotificationStore();
