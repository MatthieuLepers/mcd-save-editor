export interface ISlots {
  default(): void;
}

export type StateModifiers = 'opened' | 'selected' | 'grabbed';

export type TypeModifiers = 'action' | 'selectable' | 'grabbable';

export type IModifiers = StateModifiers | TypeModifiers;

export interface IProps {
  modifiers?: Partial<Record<IModifiers, boolean>>;
}
