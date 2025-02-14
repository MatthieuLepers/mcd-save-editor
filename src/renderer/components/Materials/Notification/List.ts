import type { INotification } from './Store';

export interface INotificationSlotProps {
  notification: INotification;
}

export interface ISlots {
  [key: string]: (props: INotificationSlotProps) => void;
}
