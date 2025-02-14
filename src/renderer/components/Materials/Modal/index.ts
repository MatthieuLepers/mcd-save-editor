export interface IHeaderSlotProps {
  title?: string;
}

export interface IFooterSlotProps {
  accept: () => void;
  refuse: () => void;
  close: () => void;
}

export interface ICloseSlotProps {
  close: () => void;
}

export interface ISlots {
  default(): void;
  header(props: IHeaderSlotProps): void;
  footer(props: IFooterSlotProps): void;
  close(props: ICloseSlotProps): void;
}

export type StructureModifiers = 'paddingLess' | 'centered' | 'rounded';

export type SizeModifiers = 'xs';

export type Modifiers = StructureModifiers | SizeModifiers;

export interface IProps {
  name: string;
  title?: string;
  showClose?: boolean;
  showFooter?: boolean;
  acceptOnly?: boolean;
  refuseOnly?: boolean;
  acceptLabel?: string;
  refuseLabel?: string;
  modifiers?: Partial<Record<Modifiers, boolean>>;
}

export interface IState {
  open: boolean;
  oldFocusElement: HTMLElement | null;
}
