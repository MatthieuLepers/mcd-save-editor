export interface ISlots {
  default(): void;
}

export type Anchor = 'top left' | 'top right' | 'bottom left' | 'bottom right';

export interface IProps {
  visible?: boolean;
  anchor?: `${Anchor}`;
  shadowed?: boolean;
}

export interface IState {
  isVisible: boolean;
}
