export interface ISlots {
  default(): void;
}

export type TypeModifiers = 'noActionRow' | 'action' | 'inner';

export interface IProps {
  modifiers?: Partial<Record<TypeModifiers, boolean>>;
}
