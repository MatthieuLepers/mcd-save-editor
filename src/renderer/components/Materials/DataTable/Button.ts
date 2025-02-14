export interface ISlots {
  default(): void;
}

export type ShapeModifiers = 'round' | 'longRound' | 'shadowed';

export type TypeModifiers = 'sort' | 'sortAsc' | 'sortDesc' | 'more' | 'less';

export type StateModifiers = 'focused';

export type ColorModifiers = 'secondary' | 'danger';

export type Modifiers = ShapeModifiers | TypeModifiers | StateModifiers | ColorModifiers;

export interface IProps {
  label?: string;
  icon?: string;
  modifiers?: Partial<Record<Modifiers, boolean>>;
}
