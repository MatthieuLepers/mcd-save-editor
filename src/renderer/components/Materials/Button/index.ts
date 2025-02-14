export interface ISlots {
  default(): void;
  icon(): void;
}

export type ColorModifiers = 'primary' | 'secondary' | 'danger' | 'grey200' | 'grey400';

export type StyleModifiers = 'fill' | 'stroke' | 'inverted' | 'squared';

export type Modifiers = ColorModifiers | StyleModifiers;

export interface IProps {
  type?: 'submit' | 'button' | 'reset';
  disabled?: boolean;
  icon?: string | boolean;
  iconSide?: 'right' | 'left';
  modifiers?: Partial<Record<Modifiers, boolean>>;
}
