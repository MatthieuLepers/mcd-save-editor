export interface ISlots {
  default(): void;
}

export type TypeModifiers = 'noActionRow' | 'action';

export interface IProps {
  modifiers?: Partial<Record<TypeModifiers, boolean>>;
}
