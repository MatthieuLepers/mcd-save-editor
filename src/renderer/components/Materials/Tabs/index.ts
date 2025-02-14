export interface ITab {
  id: string | number;
  label: string;
  order?: number;
}

export interface ITabSlotProps {
  tab: ITab;
}

export interface ISlots {
  [key: string]: (props: ITabSlotProps) => void;
}

export interface IProps {
  allowAdd?: boolean;
  allowMoveFn?: () => boolean;
  modifiers?: Record<string, boolean>;
}

export interface IState {
  offset: number;
}
