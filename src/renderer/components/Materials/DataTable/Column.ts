export interface ISlots {
  default(): void;
}

export type TypeModifiers = 'inner' | 'noActionRow' | 'action';

export interface IProps {
  modifiers?: Partial<Record<TypeModifiers, boolean>>;
}
